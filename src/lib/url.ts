import { base } from '$app/paths'

export const Url = {
    home: () => `${base}`,
    pokemon: (id?: string) => `${base}/pokemon${id ? `/${id}` : ''}`,
    moves: (id?: string) => `${base}/moves${id ? `/${id}` : ''}`,
    tms: (id?: string) => `${base}/tms${id ? `/${id}` : ''}`,
    trainers: (trainerKey?: string, pokemonId?: string) =>
        `${base}/trainers${trainerKey ? `?id=${trainerKey}${pokemonId ? `&pokemon=${pokemonId}` : ''}` : ''}`
}
