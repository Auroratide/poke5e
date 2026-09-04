import * as z from "zod"
import { Editions } from "./editions"
import * as common from "./common/schema"
import { AbilityJson, AbilityListJson } from "./abilities/schema"
import { BiomeJson, BiomesListJson } from "./biomes/schema"
import { ContestEffectJson, ContestEffectListJson } from "./contest-effects/schema"
import { EvolutionJson, EvolutionListJson } from "./evolutions/schema"
import { ItemJson, ItemListJson } from "./items/schema"
import { MoveJson, MovesListJson } from "./moves/schema"
import { PokemonJson, PokemonListJson } from "./pokemon/schema"
import type { OpenAPIV3_1 } from "openapi-types"

const API_VERSION = "1.0.0"
const ORIGIN = "https://poke5e.app"

export type OpenApiSpecification = OpenAPIV3_1.Document

type Resource = {
	segment: string,
	label: string,
	item: z.ZodType,
	list: z.ZodType,
	listOperationId: string,
	itemOperationId: string,
}

const RESOURCES: Resource[] = [
	{
		segment: "abilities",
		label: "abilities",
		item: AbilityJson,
		list: AbilityListJson,
		listOperationId: "listAbilities",
		itemOperationId: "getAbility",
	},
	{
		segment: "biomes",
		label: "biomes",
		item: BiomeJson,
		list: BiomesListJson,
		listOperationId: "listBiomes",
		itemOperationId: "getBiome",
	},
	{
		segment: "contest-effects",
		label: "contest effects",
		item: ContestEffectJson,
		list: ContestEffectListJson,
		listOperationId: "listContestEffects",
		itemOperationId: "getContestEffect",
	},
	{
		segment: "evolutions",
		label: "evolutions",
		item: EvolutionJson,
		list: EvolutionListJson,
		listOperationId: "listEvolutions",
		itemOperationId: "getEvolution",
	},
	{
		segment: "items",
		label: "items",
		item: ItemJson,
		list: ItemListJson,
		listOperationId: "listItems",
		itemOperationId: "getItem",
	},
	{
		segment: "moves",
		label: "moves",
		item: MoveJson,
		list: MovesListJson,
		listOperationId: "listMoves",
		itemOperationId: "getMove",
	},
	{
		segment: "pokemon",
		label: "pokemon",
		item: PokemonJson,
		list: PokemonListJson,
		listOperationId: "listPokemon",
		itemOperationId: "getPokemon",
	},
]

function buildTags() {
	return RESOURCES.map((it) => ({ name: it.segment }))
}

function idOf(schema: z.ZodType): string {
	const id = z.globalRegistry.get(schema)?.id
	if (id == null) throw new Error("SRD schema is missing a `.meta({ id })` — it cannot be referenced in the OpenAPI document.")
	return id
}

const ref = (schema: z.ZodType) => ({ $ref: `#/components/schemas/${idOf(schema)}` })

/**
 * Zod stamps each schema with `$schema` and a fragment-only `$id`. Both are wrong
 * inside `components.schemas`: OpenAPI supplies the dialect itself, and a bare
 * fragment is not a valid `$id`.
 */
function stripSchemaKeywords(schema: object): object {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { $schema: _s, $id: _i, ...rest } = schema as Record<string, unknown>
	return rest
}

function buildSchemas(): Record<string, object> {
	const registry = z.registry<{ id: string }>()

	// Shared enums must be registered too, or Zod buckets them into a synthetic
	// `__shared` entry and emits unresolvable `#/components/schemas/__shared#/$defs/X` refs.
	for (const schema of Object.values(common)) {
		if (schema instanceof z.ZodType) registry.add(schema, { id: idOf(schema) })
	}

	for (const resource of RESOURCES) {
		registry.add(resource.item, { id: idOf(resource.item) })
		registry.add(resource.list, { id: idOf(resource.list) })
	}

	const { schemas } = z.toJSONSchema(registry, {
		uri: (id) => `#/components/schemas/${id}`,
	})

	return Object.fromEntries(
		Object.entries(schemas).map(([id, schema]) => [id, stripSchemaKeywords(schema)]),
	)
}

function buildPaths(): Record<string, object> {
	const paths: Record<string, object> = {}

	for (const resource of RESOURCES) {
		paths[`/srd/v1/{edition}/${resource.segment}.json`] = {
			get: {
				operationId: resource.listOperationId,
				summary: resource.list.meta()?.title ?? "",
				description: resource.list.meta()?.description ?? "",
				tags: [resource.segment],
				parameters: [{ $ref: "#/components/parameters/Edition" }],
				responses: {
					"200": {
						description: resource.list.meta()?.description ?? "",
						content: { "application/json": { schema: ref(resource.list) } },
					},
					"404": {
						description: "The requested edition does not exist.",
					},
				},
			},
		}

		paths[`/srd/v1/{edition}/${resource.segment}/{id}.json`] = {
			get: {
				operationId: resource.itemOperationId,
				summary: resource.item.meta()?.title ?? "",
				description: resource.item.meta()?.description ?? "",
				tags: [resource.segment],
				parameters: [
					{ $ref: "#/components/parameters/Edition" },
					{ $ref: "#/components/parameters/Id" },
				],
				responses: {
					"200": {
						description: resource.item.meta()?.description ?? "",
						content: { "application/json": { schema: ref(resource.item) } },
					},
					"404": {
						description: "No entry with that id exists in the requested edition, or the edition does not exist.",
					},
				},
			},
		}
	}

	return paths
}

export function openApiDocument(): OpenApiSpecification {
	return {
		openapi: "3.1.0",
		info: {
			title: "Pokémon 5e SRD",
			version: API_VERSION,
			description: "Reference data for the Pokémon 5e tabletop system, served as static JSON.",
			license: {
				name: "See repository",
				url: "https://github.com/Auroratide/poke5e",
			},
		},
		servers: [{ url: ORIGIN }],
		// No auth needed
		security: [],
		tags: buildTags(),
		paths: buildPaths(),
		components: {
			parameters: {
				Edition: {
					name: "edition",
					in: "path",
					required: true,
					description: "Which ruleset the data should reflect.",
					schema: { type: "string", enum: [...Editions] },
				},
				Id: {
					name: "id",
					in: "path",
					required: true,
					description: "Kebab-case identifier of the entry, e.g. `air-lock`.",
					schema: { type: "string" },
				},
			},
			schemas: buildSchemas(),
		},
	}
}
