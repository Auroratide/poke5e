import type { RequestHandler } from '@sveltejs/kit'
import data from '../../../static/data/moves.json'

export const get: RequestHandler = async ({ params }) => {
    const selected = data.moves.find(it => it.id === params.id)
    if (selected !== undefined) {
        return {
            status: 200,
            body: selected,
        }
    } else {
        return {
            status: 404,
        }
    }
}
