/**
 * This script was used to move a bunch of moves whose damage profiles were off from the mainline games
 * into the 2018 version of the rules.
 */

import { getMoveSrd, writeMoveSrd } from "./files.ts"

const MOVES_TO_MOVE = [
	"aura-sphere",
	"beak-blast",
	"bone-rush",
	"bonemerang",
	"bounce",
	"constrict",
	"crabhammer",
	"dig",
	"dive",
	"double-iron-bash",
	"feint",
	"fire-lash",
	"fire-spin",
	"first-impression",
	"frost-breath",
	"high-jump-kick",
	"hyperspace-hole",
	"ice-ball",
	"rollout",
	"infestation",
	"mind-blown",
	"multi-attack",
	"night-daze",
	"petal-dance",
	"psybeam",
	"rapid-spin",
	"rock-wrecker",
	"sand-tomb",
	"secret-sword",
	"seed-flare",
	"shock-wave",
	"sky-attack",
	"slash",
	"smelling-salts",
	"smog",
	"solar-beam",
	"solar-blade",
	"spirit-shackle",
	"spectral-thief",
	"struggle-bug",
	"sucker-punch",
	"superpower",
	"tackle",
	"trop-kick",
	"venoshock",
	"meteor-beam",
]

async function main() {
	const moves2024 = await getMoveSrd("2024")
	const moves2018 = await getMoveSrd("2018")

	for (const moveId of MOVES_TO_MOVE) {
		const moveIn2024 = moves2024.find((it) => it.id === moveId)

		const moveIn2018 = {
			id: moveId,
			dice: moveIn2024?.dice,
			updated: null,
		}

		moves2018.push(moveIn2018)
	}

	moves2018.sort((a, b) => a.id.localeCompare(b.id))

	await writeMoveSrd(moves2018, "2018")
}

main()