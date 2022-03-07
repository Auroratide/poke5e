import type { PokeType } from '../pokemon/types'
import type { Attribute } from '../dnd/types'
import type { BodyText } from '../rendering/types'

export type Power = Attribute[] | 'none' | 'any' | 'varies'

export type Move = {
    id: string,
    name: string,
    type: PokeType,
    power: Power,
    time: string,
    pp: number,
    duration: string,
    range: string,
    description: BodyText,
    higherLevels?: string,
}
