import { defensiveMultipliers } from '@auroratide/pokemon-types'
import type { PokeType } from './types'

export const vulnerabilities = (types: PokeType[]): Set<PokeType> =>
    new Set(Object.entries(defensiveMultipliers(types))
        .filter(([_, multiplier]) => multiplier > 1)
        .map(([type, _]) => type as PokeType)
    )

export const resistances = (types: PokeType[]): Set<PokeType> => 
    new Set(Object.entries(defensiveMultipliers(types))
        .filter(([_, multiplier]) => 0 < multiplier && multiplier < 1)
        .map(([type, _]) => type as PokeType)
    )

export const immunities = (types: PokeType[]): Set<PokeType> =>
    new Set(Object.entries(defensiveMultipliers(types))
        .filter(([_, multiplier]) => multiplier === 0)
        .map(([type, _]) => type as PokeType)
    )
