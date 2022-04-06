import type { RequestHandler } from '@sveltejs/kit'
import moves from '../../../static/data/moves.json'
import tms from '../../../static/data/tms.json'
import pokemon from '../../../static/data/pokemon.json'

export const get: RequestHandler = async ({ params }) => {
    const selected = tms.tms.find(it => it.id === parseInt(params.id))
    const move = moves.moves.find(it => it.id === selected.move)
    const pokemonThatCanLearnThis = pokemon.items.filter(it =>
        it.moves.tm?.some(tm => tm === selected.id) ?? false
    )

    if (selected !== undefined) {
        return {
            status: 200,
            body: {
                ...selected,
                moveInfo: {
                    ...move,
                    name: `${selected.id} - ${move.name}`,
                },
                pokemon: pokemonThatCanLearnThis.map(it => ({
                    id: it.id,
                    name: it.name,
                })),
            },
        }
    } else {
        return {
            status: 404,
        }
    }
}
