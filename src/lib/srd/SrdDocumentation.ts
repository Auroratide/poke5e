import type { OpenAPIV3_1 } from "openapi-types"
import type { OpenApiSpecification } from "./openapi"

export type SrdEndpoint = {
	path: string,
	method: string,
	specification: OpenAPIV3_1.OperationObject,
	returns?: {
		id: string,
		schema: OpenAPIV3_1.SchemaObject,
	},
}

export type SchemaToken =
	| { kind: "punctuation", text: string }
	| { kind: "property", text: string }
	| { kind: "type", text: string }
	| { kind: "literal", text: string }
	| { kind: "reference", text: string, linkTo: string }
	| { kind: "line", indent: number }

export const SrdDocumentation = {
	endpointsByTag: (specification: OpenApiSpecification, tag: string): SrdEndpoint[] => {
		return Object.entries(specification.paths ?? {}).flatMap(([path, pathItem]) => {
			// The SRD is read-only, so `get` is the only operation a path can carry.
			const operation = pathItem?.get
			if (operation?.tags?.includes(tag) !== true) return []

			return [ {
				path,
				method: "get",
				specification: operation,
				returns: resolveResponseSchema(specification, operation),
			} ]
		})
	},

	commonSchemas: (specification: OpenApiSpecification): Record<string, OpenAPIV3_1.SchemaObject> => {
		const returnedDirectly = new Set(
			Object.values(specification.paths ?? {})
				.flatMap((pathItem) => pathItem?.get ?? [])
				.flatMap((operation) => responseSchemaId(operation) ?? []),
		)

		return Object.fromEntries(
			Object.entries(specification.components?.schemas ?? {})
				.filter(([id]) => !returnedDirectly.has(id)),
		)
	},

	humanReadableSchema: (schema: OpenAPIV3_1.SchemaObject): SchemaToken[] => {
		return tokensFor(schema, 0)
	},
} as const

function tokensFor(node: OpenAPIV3_1.SchemaObject, indent: number): SchemaToken[] {
	const reference = referencedId(node)
	if (reference != null) return [ { kind: "reference", text: reference, linkTo: reference } ]

	if (node.const !== undefined) return [ { kind: "literal", text: JSON.stringify(node.const) } ]

	if (node.anyOf != null) {
		return node.anyOf.flatMap((member, i) => i === 0
			? tokensFor(member, indent)
			: [ { kind: "punctuation", text: " | " } as SchemaToken, ...tokensFor(member, indent) ])
	}

	if (node.type === "array" && node.items != null) {
		return [ ...tokensFor(node.items, indent), { kind: "punctuation", text: "[]" } ]
	}

	if (node.type === "object" && node.properties != null) {
		const required = node.required ?? []

		return [
			{ kind: "punctuation", text: "{" },
			...Object.entries(node.properties).flatMap(([name, property]): SchemaToken[] => [
				{ kind: "line", indent: indent + 1 },
				{ kind: "property", text: name },
				{ kind: "punctuation", text: required.includes(name) ? ": " : "?: " },
				...tokensFor(property, indent + 1),
			]),
			{ kind: "line", indent },
			{ kind: "punctuation", text: "}" },
		]
	}

	if (node.type == null) return [ { kind: "type", text: "unknown" } ]

	return [ { kind: "type", text: Array.isArray(node.type) ? node.type.join(" | ") : node.type } ]
}

/** The id of the schema an operation returns on success, if it names one. */
function responseSchemaId(operation: OpenAPIV3_1.OperationObject): string | undefined {
	const success = operation.responses?.["200"]
	if (success == null || "$ref" in success || success.content == null) return undefined

	return referencedId(Object.values(success.content)[0]?.schema)
}

function resolveResponseSchema(
	specification: OpenApiSpecification,
	operation: OpenAPIV3_1.OperationObject,
): SrdEndpoint["returns"] {
	const id = responseSchemaId(operation)
	const schema = id == null ? undefined : specification.components?.schemas?.[id]

	return id == null || schema == null ? undefined : { id, schema }
}

/** The schema id a node points at, or undefined when the node is inline rather than a reference. */
function referencedId(node: object | undefined): string | undefined {
	if (node == null || !("$ref" in node) || typeof node.$ref !== "string") return undefined

	return node.$ref.split("/").pop()
}
