import {
    click,
    link,
    startJourney,
    write,
    into,
    textBox,
    dropDown,
    clear,
    radioButton,
    text,
    listItem,
    waitFor,
} from './actions.js'
import assert from 'node:assert/strict'

export async function test() {
    await startJourney('A trainer manages their pokemon')

    const name = `Automated Tester ${Math.floor(Math.random() * 999999)}`

    await createTrainer(name)
    assert.ok(await text(`${name}'s Pokemon`).exists())

    await addPokemon('Charmander')
    assert.ok(await text('Charmander').exists())
    assert.ok(await text('Fire').exists())

    await editPokemon('Fritz')
    assert.ok(await text('Fritz').exists())
    assert.ok(await text('Ember').exists())

    await addPokemon('Appletun')
    assert.ok(await text('Appletun').exists())
    assert.ok(await text('Grass').exists())
    assert.ok(await text('Dragon').exists())

    await click(link('Fritz'))
    await evolvePokemon('Charmeleon')
    assert.ok(await text('Charmeleon').exists())

    await click(link('Appletun'))
    await removePokemon()
    await waitFor(async () => !(await listItem('Appletun').exists(0, 0)))
}

const createTrainer = async (name) => {
    console.log(`  Creating ${name}...`)

    await click(link('Trainers'))
    await click(link('New Trainer'))
    await write(name, into(textBox('Name')))
    await click('Finish!')
}

const addPokemon = async (species) => {
    const searchQuery = species.toLocaleLowerCase().substring(0, 4)
    await click(link('Add Pokemon'))
    await write(searchQuery, into(textBox('Species')))
    await click(species)
}

const editPokemon = async (nickname) => {
    await click('Edit')
    await clear(textBox('Nickname'))
    await write(nickname)
    await dropDown('Nature').select('stubborn')
    await click(radioButton('Male'))

    await addMove('ember')
    await click('Finish!')
}

const addMove = async (move) => {
    await click('Add Move')
    await dropDown('Move').select(move)
}

const evolvePokemon = async (choice) => {
    await click('Evolve')
    await click(radioButton(choice))
    await click('Evolve!')
}

const removePokemon = async () => {
    await click('Remove')
    await click('Delete')
}
