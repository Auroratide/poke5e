import type { RequestHandler } from './$types'
import moves from '../../../static/data/moves.json'
import tms from '../../../static/data/tms.json'

export const GET: RequestHandler = async () => {
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

    return new Response(JSON.stringify({
        items: tmsWithMoveInfo,
    }), {
        status: 200,
    })
}
