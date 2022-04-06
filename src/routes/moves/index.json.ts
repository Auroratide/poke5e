import type { RequestHandler } from '@sveltejs/kit'
import data from '../../../static/data/moves.json'

export const get: RequestHandler = async () => {
    return {
        status: 200,
        body: data,
    }
}
