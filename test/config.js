export const observe = process.env.OBSERVE === 'true'

export const url = process.env.ENV === 'prod'
    ? 'https://auroratide.github.io/poke5e'
    : 'http://localhost:3000'
