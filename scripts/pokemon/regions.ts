import { PokemonApi } from "../pokemon-api/index.ts"

async function main() {
	const eevee = await PokemonApi.getOnePokemon("eevee")

	console.log(eevee)
}

main()