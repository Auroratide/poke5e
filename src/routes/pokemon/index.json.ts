import type { RequestHandler } from '@sveltejs/kit'
import pokemon from '../../../static/data/pokemon.json'

export const get: RequestHandler = async () => {
    return {
        status: 200,
        body: pokemon,
    }
}
