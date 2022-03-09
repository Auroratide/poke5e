const fs = require('fs/promises')

const footerText = /\d+\nThis is unofficial Fan Content and is not approved\/endorsed by © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc\.\n+Portions of the material are property of © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc\./g
const nonempty = line => line.length !== 0
const isNewMove = line => line.substring(0, line.length / 2) === line.substring(line.length / 2)
const subdivideIntoMoves = (subsections, line) => {
    if (isNewMove(line)) {
        subsections.push([line])
    } else {
        subsections[subsections.length - 1].push(line)
    }

    return subsections
}

const asId = s => s.toLowerCase()
    .replace(/[\s]/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
const moveLinesToObject = (lines) => {
    const obj = {}
    const moveName = lines[0].substring(0, lines[0].length / 2)
    obj.id = asId(moveName)
    obj.name = moveName

    const type = lines[1].match(/Type: (.*)/)[1]
    obj.type = type.toLowerCase()

    const power = lines[2].match(/Move Power: (.*)/)[1].toLowerCase()
    if (power === 'none' || power === 'any' || power === 'varies')
        obj.power = power
    else
        obj.power = power.split('/')

    const time = lines[3].match(/Move Time: (.*)/)[1]
    obj.time = time.toLowerCase()

    const pp = lines[4].match(/PP: (\d*)/)[1]
    obj.pp = Number(pp)

    const duration = lines[5].match(/Duration: (.*)/)[1]
    obj.duration = duration.toLowerCase()

    const range = lines[6].match(/Range: (.*)/)[1]
    obj.range = range.toLowerCase()

    let isHigherLevelLines = false
    let descriptionLines = []
    let higherLevelLines = []
    lines.slice(7).forEach(line => {
        if (/Higher Levels: /.test(line))
            isHigherLevelLines = true
        if (isHigherLevelLines) {
            const value = line.match(/(Higher Levels: )?(.*)/)[2]
            higherLevelLines.push(value)
        } else {
            const value = line.match(/(Description: )?(.*)/)[2]
            descriptionLines.push(value)
        }
    })

    obj.description = [descriptionLines.join(' ')]
    obj.higherLevels = higherLevelLines.length === 0 ? undefined : higherLevelLines.join(' ')

    return obj
}

fs.readFile('moves.txt', { encoding: 'utf-8' }).then(content => {
    const moves = content
        .replace(footerText, '')
        .split('\n')
        .filter(nonempty)
        .reduce(subdivideIntoMoves, []) // Move[], where Move := string[]
        .map(moveLinesToObject)
    
    return moves
}).then(moves => {
    const obj = { moves }
    return fs.writeFile('moves.json', JSON.stringify(obj, null, 2), { encoding: 'utf-8' })
})
