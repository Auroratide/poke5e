import type { PokeType } from '../pokemon/types'
import type { Attribute } from '../dnd/types'

export type Move = {
    id: string,
    name: string,
    type: PokeType,
    power: Attribute[],
    time: string,
    pp: number,
    duration: string,
    range: string,
    description: string,
    higherLevels: string,
}
