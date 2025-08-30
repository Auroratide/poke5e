import { test, expect } from "vitest"
import { provider } from ".."
import { FakemonPermissionError } from "../FakemonDataProvider"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { FakemonLocalStorage } from "../FakemonLocalStorage"

test("add, get, and update", async () => {
	const draft = stubFakemon({
		speciesName: "Droideon",
	})

	const added = await provider.add(draft.data)
	const received = await provider.getByReadKey(added.data.readKey)
	expect(received.data.speciesName).toEqual(draft.data.speciesName)

	added.data.speciesName = "Aereon"
	const didUpdate = await provider.update(added)
	expect(didUpdate).toBe(true)

	const afterUpdate = await provider.getByReadKey(added.data.readKey)
	expect(afterUpdate.data.speciesName).toEqual("Aereon")
})

test("no permission to update", async () => {
	const draft = stubFakemon({
		speciesName: "Droideon",
	})

	const added = await provider.add(draft.data)
	localStorage.clear()

	const received = await provider.getByReadKey(added.data.readKey)

	// result of get is not supposed to have a write key
	received.data.speciesName = "Aereon"
	await expect(provider.update(received)).rejects.toThrow(FakemonPermissionError)
})

test("getAllKnown", async () => {
	const drakeon = stubFakemon({ speciesName: "Drakeon" })
	const droideon = stubFakemon({ speciesName: "Droideon" })

	await provider.add(drakeon.data)
	await provider.add(droideon.data)

	const result = await provider.getAllKnown()
	const resultNames = result.map((it) => it.data.speciesName)

	expect(resultNames).toHaveLength(2)
	expect(resultNames).toContain("Drakeon")
	expect(resultNames).toContain("Droideon")
})

test("getAllKnown, but one is invalid", async () => {
	FakemonLocalStorage.add({
		id: "fake id",
		readKey: "fake key",
	})

	const drakeon = stubFakemon({ speciesName: "Drakeon" })

	await provider.add(drakeon.data)

	const result = await provider.getAllKnown()
	const resultNames = result.map((it) => it.data.speciesName)

	expect(resultNames).toHaveLength(1)
	expect(resultNames).toContain("Drakeon")
})
