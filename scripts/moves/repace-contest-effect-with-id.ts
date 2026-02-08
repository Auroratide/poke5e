import fs from "node:fs/promises"
import path from "node:path"

const CONTEST_PATH = path.join("static", "data", "contest.json")
const CONTEST_2_PATH = path.join("static", "data", "contest-2.json")
const CONTEST_EFFECT_PATH = path.join("static", "data", "contest-effects.json")

async function readJsonFile(filePath: string) {
	return JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

async function writeJsonFile(filePath: string, json: object) {
	return await fs.writeFile(filePath, JSON.stringify(json, null, "\t"), { encoding: "utf-8" })
}

type ContestMove = {
	id: string,
	effect: string
}

type ContestEffect = {
	id: string,
	name: string,
}

async function main() {
	const contestMoves: ContestMove[] = (await readJsonFile(CONTEST_PATH)).items
	const contestEffects: ContestEffect[] = (await readJsonFile(CONTEST_EFFECT_PATH)).items

	for (const move of contestMoves) {
		const effect = contestEffects.find((it) => move.effect === it.name.replaceAll("é", "e"))

		if (!effect) {
			console.log("Audit: ", move.id)
			continue
		}

		move.effect = effect.id
	}

	await writeJsonFile(CONTEST_2_PATH, { items: contestMoves })
}

main()
