import type { RequestHandler } from '@sveltejs/kit'
import data from '../../../static/data/moves.json'
import contestData from '../../../static/data/contest.json'

export const get: RequestHandler = async ({ params }) => {
    const selected = data.moves.find(it => it.id === params.id)
    const contest = contestData.items.find(it => it.id === selected.id)

    const move = {
        ...selected,
        contest
    }

    if (selected !== undefined) {
        return {
            status: 200,
            body: move,
        }
    } else {
        return {
            status: 404,
        }
    }
}
