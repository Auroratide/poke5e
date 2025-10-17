import { test, expect } from "vitest"
import { Bst } from "../Bst"

test("total", () => {
	const pichu = new Bst({
		hp: 20,
		attack: 40,
		defense: 15,
		specialAttack: 35,
		specialDefense: 35,
		speed: 60,
	})

	const glaceon = new Bst({
		hp: 65,
		attack: 60,
		defense: 110,
		specialAttack: 130,
		specialDefense: 95,
		speed: 65,
	})

	expect(pichu.total()).toEqual(205)
	expect(glaceon.total()).toEqual(525)
})