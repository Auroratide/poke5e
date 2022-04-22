import type { RequestHandler } from '@sveltejs/kit'
import pokemon from '../../../static/data/pokemon.json'
import abilities from '../../../static/data/abilities.json'
import * as normalize from '$lib/creatures/normalize'

export const get: RequestHandler = async () => {
    return {
        status: 200,
        body: {
            items: pokemon.items.map(normalize.abilities(abilities.items))
        },
    }
}
