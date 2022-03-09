import type { RequestHandler } from '@sveltejs/kit'
import pokemon from '../../../static/data/pokemon.json'

export const get: RequestHandler = async ({ params }) => {
    const selectedPokemon = pokemon.items.find(it => it.id === params.id)
    if (selectedPokemon !== undefined) {
        return {
            status: 200,
            body: selectedPokemon,
        }
    } else {
        return {
            status: 404,
        }
    }
}
