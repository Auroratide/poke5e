const fs = require("fs/promises")

const multiline = (lines, index, stopWhen) => {
	const linesToConsolidate = []
	while(index < lines.length &&  !stopWhen(lines[index], index)) {
		linesToConsolidate.push(lines[index++])
	}

	return {
		nextIndex: index,
		line: linesToConsolidate.join(" ").replace("- ", "-"),
	}
}

const footerText = /\d+\nThis is unofficial Fan Content and is not approved\/endorsed by © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc\.\n+Portions of the material are property of © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc\./g
const nonempty = line => line.trim().length !== 0

const consolidateLongNames = {
	regex: /(.*?[a-z])[A-Z].*\n(.*?)#(\d+).*?#\d+/g,
	replacement: "$1 $2#$3$1 $2#$3",
}

const shedinjaAbilityText = "A Shedinja has both of its abilities, all the time."

// pokemon names have a #; we need to avoid Hidden AbilityHidden Ability lines
const isNew = line => line.includes("#") && line.substring(0, line.length / 2) === line.substring(line.length / 2)
const subdivideIntoIndividuals = (subsections, line) => {
	if (isNew(line)) {
		subsections.push([line])
	} else {
		subsections[subsections.length - 1].push(line)
	}

	return subsections
}

const asId = s => s.toLowerCase()
	.replace(/[\s]/g, "-")
	.replace("♀", "f")
	.replace("♂", "m")
	.replace(/[^a-z0-9\-]/g, "")

const percentToRatio = (n) => {
	switch(n) {
	case "0": return "0"
	case "13": return "1"
	case "25": return "1"
	case "50": return "1"
	case "75": return "3"
	case "87": return "7"
	case "100": return "1"
	default: return "0"
	}
}
const linesToObject = (lines) => {
	let lineIndex = 0
	const obj = {}

	try {
		// id, name, number
		const [ _, name, number ] = lines[lineIndex++].match(/(.*?)\s+#(\d+)/)
		obj.id = asId(name)
		obj.name = name
		obj.number = parseInt(number)

		// type
		const type = lines[lineIndex++].match(/Type: (.*)/)[1].toLowerCase().trim()
		obj.type = type.split("/")

		// size, sr
		const [ __, size, sr ] = lines[lineIndex++].match(/Classification: (.*?)\s+\|\s+SR\s(.*)/)
		obj.size = size.toLowerCase()
		obj.sr = eval(sr) // look, I'm not gonna implement 1/2 -> 0.5, ok?

		// minLevel
		const minLevel = lines[lineIndex++].match(/Minimum Level Found: (\d+)/)[1]
		obj.minLevel = parseInt(minLevel)

		// eggGroup
		const eggGroup = lines[lineIndex++].match(/Egg Group: (.*)/)[1].toLowerCase().trim()
		obj.eggGroup = eggGroup.split(/,\s?/g)

		// gender
		const gender = lines[lineIndex++].match(/Gender Rate: (.*)/)[1].toLowerCase().trim()
		const ratio = gender.match(/(\d+)%\sm\s\/\s(\d+)%\sf/)
		if (ratio) {
			const [ ___, m, f ] = ratio
			obj.gender = `${percentToRatio(f)}:${percentToRatio(m)}`
		} else {
			obj.gender = "0:0"
		}

		// evolution (stage and maxStage)
		const [ ____, stage, maxStage ] = lines[lineIndex++].match(/Evolution Stage: (\d)\/(\d)/)
		if (maxStage > 1) {
			obj.evolution = { stage, maxStage }
		}

		// description
		const descriptionResult = multiline(lines, lineIndex, (l) => /Armor Class:/.test(l))
		obj.description = descriptionResult.line
		lineIndex = descriptionResult.nextIndex

		// ac
		const ac = lines[lineIndex++].match(/Armor Class: (\d+)/)[1]
		obj.ac = parseInt(ac)

		// hp, hit dice
		const [ _____, hp, hitDice] = lines[lineIndex++].match(/Hit Points: (\d+)\s*\|\s*Hit Dice: (.*)/)
		obj.hp = parseInt(hp)
		obj.hitDice = hitDice.trim()

		// speed
		const speedsResult = multiline(lines, lineIndex, (l) => l.startsWith("STR"))
		const speeds = speedsResult.line.match(/Speed: (.*)/)[1].toLowerCase().trim().split(/,\s?/g)
		obj.speed = speeds.map(it => {
			const [ _, value, type ] = it.match(/(\d+)ft\.\s(.*)/)
			return {
				type,
				value: parseInt(value),
			}
		})
		lineIndex = speedsResult.nextIndex

		// attributes
		++lineIndex // skip the headers
		const [ _attr, str, dex, con, int, wis, cha ] = lines[lineIndex++]
			.match(/(\d+)\s\(.*?\)\s(\d+)\s\(.*?\)\s(\d+)\s\(.*?\)\s(\d+)\s\(.*?\)\s(\d+)\s\(.*?\)\s(\d+)\s\(.*?\)/)
		obj.attributes = { str, dex, con, int, wis, cha }

		// skills
		const skillsResult = multiline(lines, lineIndex, (l) => /Saving Throws:/.test(l))
		lineIndex = skillsResult.nextIndex
		const skills = skillsResult.line.match(/Proficient Skills: (.*)/)[1].toLowerCase().trim().split(/,\s?/g)
		obj.skills = skills

		// saves
		const saves = lines[lineIndex++].match(/Saving Throws: (.*)/)[1].toLowerCase().trim().split(/,\s?/g)
		obj.savingThrows = saves.map(it => it.substring(0, 3))

		// skip vul, res, imm
		const vulResImm = multiline(lines, lineIndex, (l) => {
			// stop when the thing preceded by the colon is not one of the three
			const m = l.match(/^(.*?):/)
			return m && !["Vulnerabilities", "Resistances", "Immunities"].includes(m[1])
		})
		lineIndex = vulResImm.nextIndex
        
		// senses
		obj.senses = []
		if (/Senses:/.test(lines[lineIndex])) {
			const senses = lines[lineIndex++].match(/Senses: (.*)/)[1].toLowerCase().trim().split(/,\s?/g)
			obj.senses = senses.map(it => {
				const [ _, type, value ] = it.match(/(.*?)\s(\d+)ft/)
				return {
					type,
					value: parseInt(value),
				}
			})
		}

		// special ability text (Shedinja)
		if (lines[lineIndex].trim() === shedinjaAbilityText) {
			obj.specialAbilityText = shedinjaAbilityText
			++lineIndex
		}

		// abilities
		obj.abilities = []
		const isHiddenAbility = (l) => /Hidden Ability/.test(l)
		const isEvolution = (l) => /Evolution:/.test(l)
		const isMoveSet = (l) => /Starting Moves:/.test(l) || /Level \d+:/.test(l)
		const extractAbility = (hidden = false) => {
			const result = multiline(lines, lineIndex, (l, i) => lineIndex !== i && (isHiddenAbility(l) || /^(.*?):/.test(l)))
			const [ _, name, description ] = result.line.match(/(.*?):\s(.*)/)
			obj.abilities.push({ name, description, hidden })

			lineIndex = result.nextIndex
		}
		while (!isHiddenAbility(lines[lineIndex]) && !isEvolution(lines[lineIndex]) && !isMoveSet(lines[lineIndex])) {
			extractAbility()
		}

		if (isHiddenAbility(lines[lineIndex])) {
			++lineIndex
			extractAbility(true)
		}

		// evolution (description)
		if (isEvolution(lines[lineIndex])) {
			const result = multiline(lines, lineIndex, (l) => isMoveSet(l))
			const evolutionDescription = result.line.match(/Evolution: (.*)/)[1]
			obj.evolution.description = evolutionDescription

			lineIndex = result.nextIndex
		}

		// moves
		obj.moves = {}
		const isTM = (l) => /TM:/.test(l)
		const extractMoves = () => {
			const result = multiline(lines, lineIndex, (l, i) => lineIndex !== i && (isMoveSet(l)) || isTM(l))
			const [ _, type, list ] = result.line.match(/(.*?): (.*)/)
			let key = type.toLowerCase().replace(/\s/g, "")
			if (type === "Starting Moves")
				key = "start"

			obj.moves[key] = list.split(/,\s?/g).map(it => asId(it.trim()))

			lineIndex = result.nextIndex
		}

		while (lineIndex < lines.length && !isTM(lines[lineIndex])) {
			extractMoves()
		}

		// tm
		const isEggMoves = (l) => /Egg Moves:/.test(l)
		if (isTM(lines[lineIndex])) {
			const result = multiline(lines, lineIndex, (l) => isEggMoves(l))
			const numbers = result.line.match(/TM: (.*)/)[1].trim()
			if (numbers.toLowerCase() === "every tm") {
				// mew
				obj.moves.tm = Array.from(Array(100).keys(), n => n + 1)
			} else {
				obj.moves.tm = numbers
					.split(/,\s?/g)
					.map(it => parseInt(it))
					.filter(it => !isNaN(it))
			}

			lineIndex = result.nextIndex
		}

		// egg moves
		if (isEggMoves(lines[lineIndex])) {
			const result = multiline(lines, lineIndex, (l) => false) // until the end of the lines
			const moves = result.line.match(/Egg Moves: (.*)/)[1].trim().split(/,\s?/g)
			obj.moves.egg = moves.map(asId)

			lineIndex = result.nextIndex
		}
	} catch (err) {
		console.error(`At: ${obj.name}, line ${lineIndex}`)
		console.error("Offending line: ", lines[lineIndex])
		console.error("All lines: ", lines)
		console.error(err)
		throw err
	}

	return obj
}

const process = (filename) => fs.readFile(filename, { encoding: "utf-8" }).then(content => {
	return content
		.replace(footerText, "")
		.replace(consolidateLongNames.regex, consolidateLongNames.replacement)
		.split("\n")
		.filter(nonempty)
		.reduce(subdivideIntoIndividuals, []) // Pokemon[], where Pokemon := string[]
		.map(linesToObject)
})

Promise.all([
	process("pokemon-1-2-result.txt"),
	process("pokemon-3-4-result.txt"),
	process("pokemon-5-6-result.txt"),
	process("pokemon-7-result.txt"),
]).then(([g12, g34, g56, g7]) => {
	const obj = { items: g12.concat(g34).concat(g56).concat(g7) }
	return fs.writeFile("pokemon.json", JSON.stringify(obj, null, 2), { encoding: "utf-8" })
})
