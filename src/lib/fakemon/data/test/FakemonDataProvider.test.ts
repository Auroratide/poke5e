import { test } from "vitest"
// import { provider } from ".."
// import { stubFakemon } from "./stubs"
// import { FakemonPermissionError } from "../FakemonDataProvider"

test("placeholder", () => {})

// test("add, get, and update", async () => {
// 	const draft = stubFakemon({
// 		speciesName: "Droideon",
// 	})

// 	const added = await provider.add(draft.data)
// 	const received = await provider.getByReadKey(added.data.readKey)
// 	expect(received.data.speciesName).toEqual(draft.data.speciesName)

// 	added.data.speciesName = "Aereon"
// 	const didUpdate = await provider.update(added)
// 	expect(didUpdate).toBe(true)

// 	const afterUpdate = await provider.getByReadKey(added.data.readKey)
// 	expect(afterUpdate.data.speciesName).toEqual("Aereon")
// })

// test("no permission to update", async () => {
// 	const draft = stubFakemon({
// 		speciesName: "Droideon",
// 	})

// 	const added = await provider.add(draft.data)
// 	const received = await provider.getByReadKey(added.data.readKey)

// 	// result of get is not supposed to have a write key
// 	received.data.speciesName = "Aereon"
// 	await expect(provider.update(received)).rejects.toThrow(FakemonPermissionError)
// })
