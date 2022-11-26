/**
 * This uses PokeApi to get the primary sprites of pokemon and saves them
 * to the data file. This script can be called anytime new pokemon are added.
 */
import * as fs from 'fs/promises'
import * as path from 'path'

const POKEMON_JSON = path.join('static', 'data', 'pokemon.json')

const Api = {
    pokemon: (name) => fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(`Request for ${name} failed`)
            }
        })
}

const getApiId = (jsonId) => {
    const alolan = jsonId.match(/^alolan-(.*)$/)
    if (alolan) {
        return `${alolan[1]}-alola`
    }
    
    const galarian = jsonId.match(/^galarian-(.*)$/)
    if (galarian) {
        return `${galarian[1]}-galar`
    }

    return jsonId
}

async function main() {
    const pokemon = JSON.parse(await fs.readFile(POKEMON_JSON, { encoding: 'utf-8' }))

    const calls = pokemon.items
        .filter((item) => item.media == null)
        .map((item) => {
            console.log(`Getting for ${item.id}...`)
            return Api.pokemon(getApiId(item.id))
                .then((data) => {
                    const sprite = data.sprites.other['official-artwork'].front_default
                    if (sprite) {
                        item.media = {
                            main: sprite,
                        }
                    } else {
                        console.log(`${item.id} was missing a sprite`)
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })

    await Promise.all(calls)

    await fs.writeFile(POKEMON_JSON, JSON.stringify(pokemon, null, 2), { encoding: 'utf-8' })
}

main()