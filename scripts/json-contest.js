const fs = require("fs/promises")

const footerText = /\d+\nThis is unofficial fan content not approved\/endorsed by © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc\. Portions of\n+the material are property of © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc. Homebrew created by @JOEtheDM\./g
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
const notUndefined = (item) => item !== undefined

const asId = s => s.toLowerCase()
	.replace(/[\s]/g, "-")
	.replace(/[^a-z0-9\-]/g, "")
const moveLinesToObject = (lines) => {
	const obj = {}
	const moveName = lines[0].substring(0, lines[0].length / 2)
	obj.id = asId(moveName)

	try {
		let i = lines.indexOf(lines.find(l => /Contest: /.test(l)))
		const contest = lines[i++].match(/Contest: (.*)/)[1].toLowerCase()

		if (contest === "n/a")
			return undefined

		obj.contest = contest

		const appeal = parseInt(lines[i++].match(/Appeal: (.*)/)[1])
		obj.appeal = appeal

		const jam = parseInt(lines[i++].match(/Jam: (.*)/)[1])
		obj.jam = jam

		const theRest = lines.slice(i).join(" ")
		const effect = theRest.match(/Description: (.*)/)[1]
		obj.effect = effect

		return obj
	} catch (err) {
		console.warn(`FAILED: ${moveName} - ${err.message}`)
	}
}

fs.readFile("contest-moves.txt", { encoding: "utf-8" }).then(content => {
	const moves = content
		.replace(footerText, "")
		.split("\n")
		.filter(nonempty)
		.reduce(subdivideIntoMoves, []) // Move[], where Move := string[]
		.map(moveLinesToObject)
		.filter(notUndefined)
    
	return moves
}).then(moves => {
	const obj = { items: moves }
	return fs.writeFile("contest.json", JSON.stringify(obj, null, 2), { encoding: "utf-8" })
})
