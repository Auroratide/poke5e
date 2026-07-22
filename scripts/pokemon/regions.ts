import { PokemonApi } from "../pokemon-api/index.ts"
import { getPokemonData, writePokemonData } from "./files.ts"
import { superconsole } from "../superconsole.ts"

/**
 * This script finds the nativeRegion and regions of a pokemon and puts it into the data
 * under habitat.nativeRegion and habitat.regions, respectively.
 *
 * Valid regions are Kanto, Johto, Hoenn, Sinnoh, Hisui, Unova, Kalos, Alola, Galar, Paldea.
 *
 * nativeRegion comes from the pokemon-form's own version_group, not the species' generation,
 * because a regional variant (eg. an Alolan or Hisuian form) can debut in a later generation
 * than the base species while sharing that generation's "main region" with unrelated games
 * (eg. Legends Arceus is generation-viii, same as Sword/Shield, but its own region is Hisui,
 * not Galar). The species' pokedex_numbers, however, are shared across every variety of a
 * species, so a variant's "regions" list is the union of its own debut region plus whichever
 * of the species' pokedex regions come from generations at or after that debut.
 */

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

type GenerationInfo = {
	id: number,
	region: string,
}

const generationCache = new Map<string, GenerationInfo>()

async function getGeneration(generationName: string): Promise<GenerationInfo> {
	const cached = generationCache.get(generationName)
	if (cached != null) return cached

	const generation = await PokemonApi.getOneGeneration(generationName)
	if (generation == null) {
		throw new Error(`Generation missing from API cache: ${generationName}`)
	}

	const info = { id: generation.id, region: capitalize(generation.main_region.name) }
	generationCache.set(generationName, info)
	return info
}

type VersionGroupInfo = {
	generationId: number,
	region: string | null,
}

const versionGroupCache = new Map<string, VersionGroupInfo>()

async function getVersionGroup(versionGroupName: string): Promise<VersionGroupInfo> {
	const cached = versionGroupCache.get(versionGroupName)
	if (cached != null) return cached

	const versionGroup = await PokemonApi.getOneVersionGroup(versionGroupName)
	if (versionGroup == null) {
		throw new Error(`Version group missing from API cache: ${versionGroupName}`)
	}

	const generation = await getGeneration(versionGroup.generation.name)
	const [firstRegion] = versionGroup.regions

	const info = {
		generationId: generation.id,
		region: firstRegion != null ? capitalize(firstRegion.name) : null,
	}
	versionGroupCache.set(versionGroupName, info)
	return info
}

type PokedexInfo = {
	generationId: number,
	region: string | null,
}

const pokedexCache = new Map<string, PokedexInfo>()

async function getPokedex(pokedexName: string): Promise<PokedexInfo> {
	const cached = pokedexCache.get(pokedexName)
	if (cached != null) return cached

	const pokedex = await PokemonApi.getOnePokedex(pokedexName)
	if (pokedex == null) {
		throw new Error(`Pokedex missing from API cache: ${pokedexName}`)
	}

	if (pokedex.region == null) {
		const info = { generationId: Infinity, region: null }
		pokedexCache.set(pokedexName, info)
		return info
	}

	const [firstVersionGroup] = pokedex.version_groups
	const versionGroup = await getVersionGroup(firstVersionGroup.name)

	const info = { generationId: versionGroup.generationId, region: capitalize(pokedex.region.name) }
	pokedexCache.set(pokedexName, info)
	return info
}

async function main() {
	const pokemon = await getPokemonData()

	for (const p of pokemon) {
		const species = await PokemonApi.getOnePokemonSpecies(p.id)
		const form = await PokemonApi.getOnePokemonForm(p.id)

		if (species == null) {
			superconsole.failure(`Missing pokemon species for "${p.id}" -- skipping`)
			p.habitat.nativeRegion = ""
			p.habitat.regions = []
			continue
		}

		if (form == null) {
			superconsole.failure(`Missing pokemon form for "${p.id}" -- skipping`)
			p.habitat.nativeRegion = ""
			p.habitat.regions = []
			continue
		}

		const debut = await getVersionGroup(form.version_group.name)

		if (debut.region == null) {
			superconsole.failure(`No debut region found for "${p.id}" (${p.name}) -- skipping`)
			p.habitat.nativeRegion = ""
			p.habitat.regions = []
			continue
		}

		const regions = new Set<string>([debut.region])

		for (const entry of species.pokedex_numbers) {
			const pokedex = await getPokedex(entry.pokedex.name)
			if (pokedex.region != null && pokedex.generationId >= debut.generationId) {
				regions.add(pokedex.region)
			}
		}

		p.habitat.nativeRegion = debut.region
		p.habitat.regions = [...regions].sort()
	}

	await writePokemonData(pokemon)
	superconsole.success("Done")
}

main()
