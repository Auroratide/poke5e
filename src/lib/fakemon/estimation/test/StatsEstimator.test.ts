import { test, expect } from "vitest"
import { StatsEstimator } from "../StatsEstimator"
import { PokemonType } from "$lib/pokemon/types"
import { Bst } from "$lib/pokemon/bst"
import { HitDice } from "$lib/dnd/hit-dice"

test("normal pokemon", () => {
	const estimator = new StatsEstimator()
		.withType(new PokemonType(["normal"]))
		.withHitDice(new HitDice("d6"))
		.withLevel(1)
	
	const eevee = new Bst({
		hp: 55,
		attack: 55,
		defense: 50,
		specialAttack: 45,
		specialDefense: 65,
		speed: 55,
	})

	const result = estimator.fromBst(eevee)

	expect(result).toEqual({
		hp: 17,
		ac: 14,
		attributes: {
			str: 12,
			dex: 13,
			con: 13,
			int: 6,
			wis: 11,
			cha: 10,
		},
	})
})

test("psychic pokemon", () => {
	const estimator = new StatsEstimator()
		.withType(new PokemonType(["psychic"]))
		.withHitDice(new HitDice("d6"))
		.withLevel(1)
	
	const espeon = new Bst({
		hp: 65,
		attack: 65,
		defense: 60,
		specialAttack: 130,
		specialDefense: 95,
		speed: 110,
	})

	const result = estimator.fromBst(espeon)

	expect(result).toEqual({
		hp: 18,
		ac: 15,
		attributes: {
			str: 13,
			dex: 19,
			con: 14,
			int: 12,
			wis: 15,
			cha: 10,
		},
	})
})

test("charisma pokemon", () => {
	const estimator = new StatsEstimator()
		.withType(new PokemonType(["fairy"]))
		.withHitDice(new HitDice("d6"))
		.withLevel(1)
	
	const sylveon = new Bst({
		hp: 95,
		attack: 65,
		defense: 60,
		specialAttack: 110,
		specialDefense: 130,
		speed: 60,
	})

	const result = estimator.fromBst(sylveon)

	expect(result).toEqual({
		hp: 18,
		ac: 17,
		attributes: {
			str: 13,
			dex: 14,
			con: 15,
			int: 6,
			wis: 16,
			cha: 15,
		},
	})
})
