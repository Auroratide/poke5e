import type { RequestHandler } from '@sveltejs/kit'
import pokemon from '../../../static/data/pokemon.json'
import abilities from '../../../static/data/abilities.json'
import * as normalize from '$lib/creatures/normalize'

export const get: RequestHandler = async ({ params }) => {
    const selectedPokemon = pokemon.items.find(it => it.id === params.id)
    if (selectedPokemon !== undefined) {
        return {
            status: 200,
            body: normalize.abilities(abilities.items)(selectedPokemon),
        }
    } else {
        return {
            status: 404,
        }
    }
}
