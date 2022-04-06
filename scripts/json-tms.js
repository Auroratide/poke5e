const fs = require('fs/promises')

const tmPattern = /(\d\d\d?) - (.*?) ₽([0-9,]+)/gm
const asId = (rawNumber) => parseInt(rawNumber)
const asMoveId = (moveName) => moveName
    .toLowerCase()
    .replace(/[\s]/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
const asNumericCost = (rawCost) => parseInt(rawCost.replace(',', ''))
const createTmObject = (match) => {
    const id = asId(match[1])
    const move = asMoveId(match[2])
    const cost = asNumericCost(match[3])

    return { id, move, cost }
}
const byTmNumber = (left, right) => left.id - right.id

fs.readFile('tms.txt', { encoding: 'utf-8' }).then(content => {
    const tms = Array.from(content.matchAll(tmPattern))
        .map(createTmObject)
        .sort(byTmNumber)
    
    return tms
}).then(tms => {
    const obj = { tms }
    return fs.writeFile('tms.json', JSON.stringify(obj, null, 2), { encoding: 'utf-8' })
})
