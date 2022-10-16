
import type { RequestHandler } from './$types'
import pokemon from '../../../static/data/pokemon.json'
import abilities from '../../../static/data/abilities.json'
import * as normalize from '$lib/creatures/normalize'

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({
        items: pokemon.items.map(normalize.abilities(abilities.items)),
    }), {
        status: 200,
    })
}
