import { test, expect } from "vitest"
import { StatsEstimator } from "../StatsEstimator"
import { PokemonType } from "$lib/pokemon/types-2"
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
