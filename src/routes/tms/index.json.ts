import type { RequestHandler } from '@sveltejs/kit'
import moves from '../../../static/data/moves.json'
import tms from '../../../static/data/tms.json'

export const get: RequestHandler = async () => {
    const tmsWithMoveInfo = tms.tms.map(tm => {
        const move = moves.moves.find(it => it.id === tm.move)
        return {
            ...tm,
            moveInfo: {
                id: move.id,
                name: `${tm.id} - ${move.name}`,
                type: move.type,
                power: move.power,
                pp: move.pp,
            },
        }
    })

    return {
        status: 200,
        body: {
            items: tmsWithMoveInfo,
        },
    }
}
