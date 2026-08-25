import { test, expect, describe } from "vitest"
import type { OpenAPIV3_1 } from "openapi-types"
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
			.toEqual(["id", "name", "aliases", "description", "deprecated"])
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
		// `Pokemon` carries no property descriptions, so the shape stands on its own
		const result = SrdDocumentation.humanReadableSchema(schemas.Pokemon)
		const text = render(result)

		// `specialAbilityText` and `unofficial` are missing from `required`
		expect(text).toContain("\tspecialAbilityText?: string")
		expect(text).toContain("\tunofficial?: boolean")
		expect(text).toContain("\teggGroup: string[]")
	})

	test("classifies tokens so they can be highlighted independently", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.Ability)

		expect(result.filter((it) => it.kind === "property").map((it) => it.text))
			.toEqual(["id", "name", "aliases", "description", "deprecated"])
		expect(result.filter((it) => it.kind === "type").map((it) => it.text))
			.toEqual(["string", "string", "string", "string", "boolean"])
	})

	test("an array of references keeps the link target", () => {
		const result = SrdDocumentation.humanReadableSchema(schemas.BiomeList)

		expect(render(result)).toEqual(`{
	values: Biome[]
}`)
		expect(result.filter((it) => it.kind === "reference"))
			.toEqual([ { kind: "reference", text: "Biome", linkTo: "Biome" } ])
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

	describe("doccomments", () => {
		test("a described property is preceded by its description", () => {
			const result = SrdDocumentation.humanReadableSchema(schemas.Ability)

			expect(render(result)).toEqual(`{
	/**
	 * Kebab-case unique identifier.
	 */
	id: string

	/**
	 * Display name, localized.
	 */
	name: string

	/**
	 * Alternative display names for searchability.
	 * Usually the English name for localized output.
	 */
	aliases?: string[]

	/**
	 * Rules text for the ability. Plain text with no markup.
	 */
	description: string

	/**
	 * Ability is to no longer be used.
	 */
	deprecated?: boolean
}`)
		})

		test("is its own token kind so it can be highlighted independently", () => {
			const result = SrdDocumentation.humanReadableSchema(schemas.Ability)
			const doccomments = result.filter((it) => it.kind === "doccomment").map((it) => it.text)

			// one delimiter pair per described property
			expect(doccomments.filter((it) => it === "/**")).toHaveLength(5)
			expect(doccomments.filter((it) => it === " */")).toHaveLength(5)

			expect(doccomments.filter((it) => it.startsWith(" * ")))
				.toEqual([
					" * Kebab-case unique identifier.",
					" * Display name, localized.",
					" * Alternative display names for searchability.",
					" * Usually the English name for localized output.",
					" * Rules text for the ability. Plain text with no markup.",
					" * Ability is to no longer be used.",
				])
		})

		test("a description with newlines becomes one comment line each", () => {
			const wrapped: OpenAPIV3_1.SchemaObject = {
				type: "object",
				properties: {
					field: { type: "string", description: "First line.\nSecond line." },
				},
				required: ["field"],
			}

			expect(render(SrdDocumentation.humanReadableSchema(wrapped))).toEqual(`{
	/**
	 * First line.
	 * Second line.
	 */
	field: string
}`)
		})

		test("a blank line keeps its asterisk but gains no trailing space", () => {
			const paragraphs: OpenAPIV3_1.SchemaObject = {
				type: "object",
				properties: {
					field: { type: "string", description: "First paragraph.\n\nSecond paragraph." },
				},
				required: ["field"],
			}
			const result = SrdDocumentation.humanReadableSchema(paragraphs)

			expect(render(result)).toEqual(`{
	/**
	 * First paragraph.
	 *
	 * Second paragraph.
	 */
	field: string
}`)
			expect(result.filter((it) => it.kind === "doccomment").map((it) => it.text))
				.not.toContain(" * ")
		})

		test("strips the indentation a template literal leaves behind", () => {
			// `description: \`First line.
			//     Second line.\`` carries the source file's tabs
			const indented: OpenAPIV3_1.SchemaObject = {
				type: "object",
				properties: {
					field: { type: "string", description: "\n\t\t\tFirst line.\n\t\t\tSecond line.\n\t\t" },
				},
				required: ["field"],
			}

			expect(render(SrdDocumentation.humanReadableSchema(indented))).toEqual(`{
	/**
	 * First line.
	 * Second line.
	 */
	field: string
}`)
		})

		test("a property with no description gets no doccomment", () => {
			// No resource other than abilities annotates its properties yet
			const result = SrdDocumentation.humanReadableSchema(schemas.Biome)

			expect(result.filter((it) => it.kind === "doccomment")).toEqual([])
			expect(render(result)).toEqual(`{
	id: string
	name: string
}`)
		})

		test("is separated from the property above it, but not from the brace", () => {
			const consecutive: OpenAPIV3_1.SchemaObject = {
				type: "object",
				properties: {
					first: { type: "string", description: "The first one." },
					second: { type: "string", description: "The second one." },
				},
				required: ["first", "second"],
			}

			expect(render(SrdDocumentation.humanReadableSchema(consecutive))).toEqual(`{
	/**
	 * The first one.
	 */
	first: string

	/**
	 * The second one.
	 */
	second: string
}`)
		})

		test("an object with no descriptions gains no blank lines", () => {
			const result = SrdDocumentation.humanReadableSchema(schemas.Biome)

			expect(render(result)).not.toContain("\n\n")
		})

		test("only the described properties of a partially annotated object", () => {
			// Hand-rolled: every real schema is currently all-or-nothing
			const mixed: OpenAPIV3_1.SchemaObject = {
				type: "object",
				properties: {
					annotated: { type: "string", description: "Has a description." },
					bare: { type: "string" },
				},
				required: ["annotated", "bare"],
			}

			expect(render(SrdDocumentation.humanReadableSchema(mixed))).toEqual(`{
	/**
	 * Has a description.
	 */
	annotated: string
	bare: string
}`)
		})

		test("the schema's own description is not emitted", () => {
			// `Ability` is described too, but that belongs to the card's prose,
			// not to the inside of the code block
			const result = SrdDocumentation.humanReadableSchema(schemas.Ability)

			expect(render(result)).not.toContain("A Pokémon ability as defined by")
		})

		test("describes a property that renders as a reference", () => {
			const result = SrdDocumentation.humanReadableSchema(schemas.AbilityList)

			expect(render(result)).toEqual(`{
	/**
	 * Every ability available in the requested edition, sorted by id.
	 */
	values: Ability[]
}`)
		})

		test("indents the doccomment alongside the property it describes", () => {
			const nested: OpenAPIV3_1.SchemaObject = {
				type: "object",
				properties: {
					outer: {
						type: "object",
						properties: {
							inner: { type: "string", description: "Two levels deep." },
						},
						required: ["inner"],
						description: "One level deep.",
					},
				},
				required: ["outer"],
			}

			expect(render(SrdDocumentation.humanReadableSchema(nested))).toEqual(`{
	/**
	 * One level deep.
	 */
	outer: {
		/**
		 * Two levels deep.
		 */
		inner: string
	}
}`)
		})
	})
})
