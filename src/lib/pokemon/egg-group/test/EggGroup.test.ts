import { test, expect } from "vitest"
import { EggGroup } from "../EggGroup"
import { stubEggGroup } from "./stubs"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"

test("groupBy", () => {
	const exclusiveField = stubPokemonSpecies({
		eggGroups: stubEggGroup(["field"]).data,
	})

	const exclusiveBug = stubPokemonSpecies({
		eggGroups: stubEggGroup(["bug"]).data,
	})

	const fieldAndBug = stubPokemonSpecies({
		eggGroups: stubEggGroup(["field", "bug"]).data,
	})

	const result = EggGroup.groupBy([exclusiveField, exclusiveBug, fieldAndBug])

	expect(result.get("field")).toEqualData({
		exclusive: [exclusiveField],
		shares: [fieldAndBug],
	})

	expect(result.get("bug")).toEqualData({
		exclusive: [exclusiveBug],
		shares: [fieldAndBug],
	})
})
