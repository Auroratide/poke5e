import type { RequestHandler } from '@sveltejs/kit'
import data from '../../../static/data/moves.json'
import contestData from '../../../static/data/contest.json'

export const get: RequestHandler = async () => {
    const moves = data.moves.map(it => ({
        ...it,
        contest: contestData.items.find(c => c.id === it.id)
    }))

    return {
        status: 200,
        body: { moves },
    }
}
