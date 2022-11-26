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
    switch (jsonId) {
        case 'keldeo': return 'keldeo-ordinary'
        case 'snowy-castform': return 'castform-snowy'
        case 'rainy-castform': return 'castform-rainy'
        case 'sunny-castform': 'castform-sunny'
        case 'oricorio-sensu-style': return 'oricorio-sensu'
        case 'oricorio-baile-style': 'oricorio-baile'
        case 'oricorio-pom-pom-style': 'oricorio-pom-pom'
        case 'oricorio-pau-style': return 'oricorio-pau'
        case 'meowstic-f': return 'meowstic-female'
        case 'meowstic-m': return 'meowstic-male'
        case 'darmanitan': return 'darmanitan-standard'
        case 'galarian-darmanitan': return 'darmanitan-galar-standard'
        case 'meloetta---pirouette': return 'meloetta-pirouette'
        case 'meloetta---aria': return 'meloetta-aria'
        case 'deoxys': return 'deoxys-normal'
        case 'wormadam-plant-cloak': return 'wormadam-plant'
        case 'wormadam-trash-cloak': return 'wormadam-trash'
        case 'wormadam-sand-cloak': return 'wormadam-sandy'
        case 'gourgeist': return 'gourgeist-average'
        case 'black-kyurem': return 'kyurem-black'
        case 'white-kyurem': return 'kyurem-white'
        case 'thundurus': return 'thundurus-incarnate'
        case 'landorus': return 'landorus-incarnate'
        case 'tornadus': return 'tornadus-incarnate'
        case 'wishiwashi-school-form': return 'wishiwashi-school'
        case 'wishiwashi-solo-form': return 'wishiwashi-solo'
        case 'aegislash': return 'aegislash-shield'
        case 'basculin': return 'basculin-red-striped'
        case 'zygarde-complete-forme': return 'zygarde-complete'
        case 'zygarde-50-forme': return 'zygarde-50'
        case 'zygarde-10-forme': return 'zygarde-10'
        case 'minior-meteor-form': return '774'
        case 'minior-core-form': return '774'
        case 'lycanroc-dusk-form': return 'lycanroc-dusk'
        case 'lycanroc-midday-form': return 'lycanroc-midday'
        case 'lycanroc-midnight-form': return 'lycanroc-midnight'
        case 'mimikyu': return 'mimikyu-disguised'
        case 'ultra-necrozma': return 'necrozma-ultra'
        case 'dusk-mane-necrozma': return 'necrozma-dusk'
        case 'dawn-wings-necrozma': return 'necrozma-dawn'
        case 'giratina-origin-forme': return 'giratina-origin'
        case 'giratina-altered-forme': return 'giratina-altered'
        case 'hoopa-confined': return 'hoopa'
        case 'pumpkaboo': return 'pumpkaboo-average'
    }

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