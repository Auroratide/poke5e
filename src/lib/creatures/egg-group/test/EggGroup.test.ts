import { test, expect } from "vitest"
import { EggGroup } from "../EggGroup"
import { stubPokemon } from "$lib/creatures/test/stubs"
import { stubEggGroup } from "./stubs"

test("groupBy", () => {
	const exclusiveField = stubPokemon({
		eggGroup: stubEggGroup(["field"]),
	})

	const exclusiveBug = stubPokemon({
		eggGroup: stubEggGroup(["bug"]),
	})

	const fieldAndBug = stubPokemon({
		eggGroup: stubEggGroup(["field", "bug"]),
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
