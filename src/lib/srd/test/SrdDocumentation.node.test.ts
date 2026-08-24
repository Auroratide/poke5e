import { test, expect, describe } from "vitest"
import { SrdDocumentation, type SchemaToken } from "../SrdDocumentation"
import { openApiDocument } from "../openapi"
import * as CommonSchemas from "../common/schema"

test("getting all endpoints for a tag", () => {
	const specification = openApiDocument()

	// one tag
	const abilities = SrdDocumentation.endpointsByTag(specification, "abilities")

	expect(abilities.length).toEqual(2)

	expect(abilities[0].path).toEqual("/srd/v1/{edition}/abilities.json")
	expect(abilities[0].method).toEqual("get")
	expect(abilities[0].specification.operationId).toEqual("listAbilities")
	expect(abilities[0].returns?.id).toEqual("AbilityList")

	expect(abilities[1].path).toEqual("/srd/v1/{edition}/abilities/{id}.json")
	expect(abilities[1].method).toEqual("get")
	expect(abilities[1].specification.operationId).toEqual("getAbility")
	expect(abilities[1].returns?.id).toEqual("Ability")

	// second tag
	const moves = SrdDocumentation.endpointsByTag(specification, "moves")

	expect(moves.length).toEqual(2)

	expect(moves[0].path).toEqual("/srd/v1/{edition}/moves.json")
	expect(moves[0].method).toEqual("get")
	expect(moves[0].specification.operationId).toEqual("listMoves")
	expect(moves[0].returns?.id).toEqual("MoveList")

	expect(moves[1].path).toEqual("/srd/v1/{edition}/moves/{id}.json")
	expect(moves[1].method).toEqual("get")
	expect(moves[1].specification.operationId).toEqual("getMove")
	expect(moves[1].returns?.id).toEqual("Move")
})

describe("the schema an endpoint returns", () => {
	const specification = openApiDocument()

	test("is resolved, not left as a reference", () => {
		const [ list ] = SrdDocumentation.endpointsByTag(specification, "abilities")

		// The document stores `{ $ref: "…/AbilityList" }`; we want what it points at
		expect(list.returns?.schema).toBeDefined()
		expect("$ref" in (list.returns?.schema ?? {})).toBe(false)
		expect(list.returns?.schema).toBe(specification.components?.schemas?.AbilityList)
	})

	test("feeds humanReadableSchema directly", () => {
		const [ list, item ] = SrdDocumentation.endpointsByTag(specification, "abilities")

		const listTokens = SrdDocumentation.humanReadableSchema(list.returns!.schema)
		expect(listTokens.filter((it) => it.kind === "property").map((it) => it.text))
			.toEqual(["values"])
		expect(listTokens.filter((it) => it.kind === "reference").map((it) => it.text))
			.toEqual(["Ability"])

		// the item endpoint expands the shape rather than naming it
		const itemTokens = SrdDocumentation.humanReadableSchema(item.returns!.schema)
		expect(itemTokens.filter((it) => it.kind === "property").map((it) => it.text))
			.toEqual(["id", "name", "aliases", "description"])
	})

	test("is declared by every endpoint in the document", () => {
		const missing = (specification.tags ?? [])
			.flatMap((tag) => SrdDocumentation.endpointsByTag(specification, tag.name))
			.filter((endpoint) => endpoint.returns == null)
			.map((endpoint) => endpoint.specification.operationId)

		expect(missing).toEqual([])
	})
})

test("getting the common schemas", () => {
	const specification = openApiDocument()

	const result = SrdDocumentation.commonSchemas(specification)
	const actualNames = Object.keys(result).sort()
	const expectedNames = Object.values(CommonSchemas).map((it) => it.meta().id).sort()

	expect(actualNames).toEqual(expectedNames)
})

describe("humanReadableSchema", () => {
	const specification = openApiDocument()
	const schemas = specification.components?.schemas ?? {}

	// Pretends to be a simple renderer to make tests assertions closer to
	// the intended output
	const render = (tokens: SchemaToken[]) => tokens
		.map((it) => it.kind === "line" ? `\n${"\t".repeat(it.indent)}` : it.text)
		.join("")

	test("renders a union of literals inline", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.Attribute)

		expect(render(result)).toEqual("\"str\" | \"dex\" | \"con\" | \"int\" | \"wis\" | \"cha\"")
		expect(result.filter((it) => it.kind === "literal").map((it) => it.text))
			.toEqual(["\"str\"", "\"dex\"", "\"con\"", "\"int\"", "\"wis\"", "\"cha\""])
	})

	test("renders an object as a block of properties", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.AttributeValues)

		expect(render(result)).toEqual(`{
	str: integer
	dex: integer
	con: integer
	int: integer
	wis: integer
	cha: integer
}`)
	})

	test("marks optional properties and array types", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.Ability)

		// `aliases` is the only property missing from the schema's `required` list
		expect(render(result)).toEqual(`{
	id: string
	name: string
	aliases?: string[]
	description: string
}`)
	})

	test("classifies tokens so they can be highlighted independently", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.Ability)

		expect(result.filter((it) => it.kind === "property").map((it) => it.text))
			.toEqual(["id", "name", "aliases", "description"])
		expect(result.filter((it) => it.kind === "type").map((it) => it.text))
			.toEqual(["string", "string", "string", "string"])
	})

	test("an array of references keeps the link target", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.AbilityList)

		expect(render(result)).toEqual(`{
	values: Ability[]
}`)
		expect(result.filter((it) => it.kind === "reference"))
			.toEqual([ { kind: "reference", text: "Ability", linkTo: "Ability" } ])
	})

	test("expands anonymous nested objects but leaves named ones as references", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.Pokemon)
		const text = render(result)

		// `habitat` has no schema id of its own, so its shape is inlined
		expect(text).toContain(`	habitat: {
		biomes: string[]
		nativeRegion: string
		regions: string[]
	}`)

		// `attributes` and `type` are named schemas, so they stay one line and link out
		expect(text).toContain("\tattributes: AttributeValues")
		expect(text).toContain("\ttype: PokeType[]")

		expect(result.filter((it) => it.kind === "reference").map((it) => it.linkTo))
			.toContain("AttributeValues")
	})

	test("omits the safe-integer bounds Zod emits for z.int()", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.AttributeValues)

		expect(render(result)).not.toContain("9007199254740991")
	})
})
