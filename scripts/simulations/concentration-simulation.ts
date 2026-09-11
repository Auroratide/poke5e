import chalk from "chalk"

const TRIALS = 100_000
const SEED = 0x5ca1ab1e

// ---------------------------------------------------------------- setup

type Dice = { count: number, sides: number, flat: number }

type Archetype = {
	level: number,
	con: number,
	hammerArm: Dice,
}

const ARCHETYPES: Archetype[] = [
	{ level: 4, con: 14, hammerArm: { count: 4, sides: 4, flat: 4 } },
	{ level: 9, con: 16, hammerArm: { count: 2, sides: 12, flat: 7 } },
	{ level: 16, con: 18, hammerArm: { count: 4, sides: 8, flat: 10 } },
	{ level: 20, con: 20, hammerArm: { count: 8, sides: 6, flat: 12 } },
]

type Formula = {
	name: string,
	description: string,
	dc: (damage: number) => number,
}

const FORMULAS: Formula[] = [
	{
		name: "og",
		description: "clamp(floor(dmg / 2), 10, 30)",
		dc: (damage) => clamp(Math.floor(damage / 2), 10, 30),
	},
	{
		name: "new",
		description: "clamp(10 + floor(dmg / 10), 10, 30)",
		dc: (damage) => clamp(10 + Math.floor(damage / 10), 10, 30),
	},
]

// ---------------------------------------------------------------- dice

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

// Seeded so two runs of the script are comparable to each other.
const mulberry32 = (seed: number) => () => {
	seed = (seed + 0x6d2b79f5) | 0
	let t = seed
	t = Math.imul(t ^ (t >>> 15), t | 1)
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const rng = mulberry32(SEED)
const d = (sides: number) => Math.floor(rng() * sides) + 1

const roll = (dice: Dice) => {
	let total = dice.flat
	for (let i = 0; i < dice.count; i++) total += d(dice.sides)
	return total
}

const abilityMod = (score: number) => Math.floor((score - 10) / 2)
const diceLabel = (dice: Dice) => `${dice.count}d${dice.sides} + ${dice.flat}`
const range = (dice: Dice) => [dice.count + dice.flat, dice.count * dice.sides + dice.flat]

// ---------------------------------------------------------------- simulation

type Result = {
	passes: number,
	// The save is hopeless when even a natural 20 misses; auto when even a 1 hits.
	impossible: number,
	automatic: number,
	dcSum: number,
	dcCounts: Map<number, number>,
}

type Simulation = {
	archetype: Archetype,
	damageSum: number,
	results: Map<string, Result>,
}

const emptyResult = (): Result => ({
	passes: 0, impossible: 0, automatic: 0, dcSum: 0, dcCounts: new Map(),
})

const simulate = (archetype: Archetype): Simulation => {
	const mod = abilityMod(archetype.con)
	const results = new Map(FORMULAS.map((f) => [f.name, emptyResult()]))
	let damageSum = 0

	for (let i = 0; i < TRIALS; i++) {
		const damage = roll(archetype.hammerArm)
		// One d20 shared by both formulas, so the comparison is paired: the
		// only thing that differs between them is the DC.
		const save = d(20) + mod
		damageSum += damage

		for (const formula of FORMULAS) {
			const result = results.get(formula.name)!
			const dc = formula.dc(damage)

			if (save >= dc) result.passes++
			if (dc - mod > 20) result.impossible++
			if (dc - mod <= 1) result.automatic++
			result.dcSum += dc
			result.dcCounts.set(dc, (result.dcCounts.get(dc) ?? 0) + 1)
		}
	}

	return { archetype, damageSum, results }
}

// ---------------------------------------------------------------- reporting

const pct = (n: number) => `${((100 * n) / TRIALS).toFixed(1)}%`
const avg = (n: number) => (n / TRIALS).toFixed(1)
const pad = (s: string, n: number) => s.padEnd(n)
const pads = (s: string, n: number) => s.padStart(n)

const dcRange = (result: Result) => {
	const dcs = [...result.dcCounts.keys()].sort((a, b) => a - b)
	return dcs[0] === dcs[dcs.length - 1] ? `${dcs[0]}` : `${dcs[0]}–${dcs[dcs.length - 1]}`
}

const summary = (simulations: Simulation[]) => {
	const header = [
		pad("lvl", 5), pad("CON", 5), pad("save", 6), pad("hammer arm", 13), pad("damage", 16),
		...FORMULAS.flatMap((f) => [pad(`${f.name} DC`, 9), pad("avg", 6), pad("pass", 8)]),
		pads("Δ pass", 8),
	].join("")
	console.log(chalk.bold(`  ${header}`))

	for (const sim of simulations) {
		const { archetype } = sim
		const mod = abilityMod(archetype.con)
		const [low, high] = range(archetype.hammerArm)
		const passRates = FORMULAS.map((f) => sim.results.get(f.name)!.passes / TRIALS)
		const delta = 100 * (passRates[1] - passRates[0])

		const cells = [
			pad(`${archetype.level}`, 5),
			pad(`${archetype.con}`, 5),
			pad(`${mod >= 0 ? "+" : ""}${mod}`, 6),
			pad(diceLabel(archetype.hammerArm), 13),
			pad(`${low}–${high} (${avg(sim.damageSum)})`, 16),
			...FORMULAS.flatMap((f) => {
				const result = sim.results.get(f.name)!
				return [pad(dcRange(result), 9), pad(avg(result.dcSum), 6), pad(pct(result.passes), 8)]
			}),
			pads(`${delta >= 0 ? "+" : ""}${delta.toFixed(1)}pp`, 8),
		].join("")
		console.log(`  ${cells}`)
	}
}

const BAR_WIDTH = 18
const bar = (fraction: number) =>
	pad("█".repeat(Math.round(fraction * BAR_WIDTH)), BAR_WIDTH)

const distributions = (simulations: Simulation[]) => {
	for (const sim of simulations) {
		const { archetype } = sim
		console.log(chalk.bold(`\n  level ${archetype.level}  `) +
			chalk.dim(`${diceLabel(archetype.hammerArm)} vs CON ${archetype.con}`))

		const dcs = [...new Set(FORMULAS.flatMap((f) => [...sim.results.get(f.name)!.dcCounts.keys()]))]
			.sort((a, b) => a - b)

		// Each cell is a fixed-width bar plus a fixed-width percentage, so the
		// columns line up without having to measure the colour codes.
		console.log(chalk.dim(`    DC   ${FORMULAS.map((f) => pad(f.name, BAR_WIDTH + 9)).join("")}`))
		for (const dc of dcs) {
			const cells = FORMULAS.map((f) => {
				const count = sim.results.get(f.name)!.dcCounts.get(dc) ?? 0
				return `${chalk.cyan(bar(count / TRIALS))} ${pads(count === 0 ? "·" : pct(count), 6)}`
			})
			console.log(`    ${pads(`${dc}`, 2)}   ${cells.join("  ")}`)
		}
	}
}

const outliers = (simulations: Simulation[]) => {
	const rows = simulations.flatMap((sim) => FORMULAS.map((f) => ({
		sim, formula: f, result: sim.results.get(f.name)!,
	}))).filter(({ result }) => result.impossible > 0 || result.automatic > 0)

	if (rows.length === 0) return

	console.log(chalk.bold("\n  saves decided before the d20 is thrown"))
	for (const { sim, formula, result } of rows) {
		const parts = []
		if (result.impossible > 0) parts.push(chalk.red(`${pct(result.impossible)} hopeless (a nat 20 still fails)`))
		if (result.automatic > 0) parts.push(chalk.green(`${pct(result.automatic)} free (a nat 1 still passes)`))
		console.log(`    ${pad(`level ${sim.archetype.level}`, 10)}${pad(formula.name, 6)}${parts.join(chalk.dim(", "))}`)
	}
}

// ---------------------------------------------------------------- main

async function main() {
	console.log(chalk.bold("\n  concentration saves vs hammer arm") +
		chalk.dim(`  —  ${TRIALS.toLocaleString()} trials, no proficiency, seed 0x${SEED.toString(16)}\n`))

	for (const formula of FORMULAS)
		console.log(`  ${chalk.bold(pad(formula.name, 6))}${chalk.dim(formula.description)}`)
	console.log()

	const simulations = ARCHETYPES.map(simulate)

	summary(simulations)
	distributions(simulations)
	outliers(simulations)
	console.log()
}

main()
