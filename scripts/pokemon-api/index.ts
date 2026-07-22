import { getOneGeneration } from "./generation.ts"
import { getOnePokedex } from "./pokedex.ts"
import { getOnePokemon } from "./pokemon.ts"
import { getOnePokemonForm } from "./pokemon-form.ts"
import { getOnePokemonSpecies } from "./pokemon-species.ts"
import { getOneVersionGroup } from "./version-group.ts"

export const PokemonApi = {
	getOneGeneration,
	getOnePokedex,
	getOnePokemon,
	getOnePokemonForm,
	getOnePokemonSpecies,
	getOneVersionGroup,
}
