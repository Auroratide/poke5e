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
} from './actions.js'

export async function test() {
    await startJourney('A trainer manages their pokemon')

    await click(link('Trainers'))
    await click(link('New Trainer'))
    await write('Automated Journey Tester', into(textBox('Name')))
    await click('Finish!')
    await click(link('Add Pokemon'))
    await write('char', into(textBox('Species')))
    await click('Charmander')
    await click('Edit')
    await clear(textBox('Nickname'))
    await write('Fritz')
    await dropDown('Nature').select('stubborn')
    await click(radioButton('Male'))
    await click('Add Move')
    await dropDown('Move').select('ember')
    await click('Add Move')
    await click('Finish!')
    await click('Evolve')
    await click('Evolve!')
    await click('Remove')
    await click('Delete')
}
