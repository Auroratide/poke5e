import { test, expect } from "vitest"
import { FakemonLocalStorage } from "../FakemonLocalStorage"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { FakemonLocalKeychain } from "$lib/account/FakemonLocalKeychain"

test("adding overwrites by read key", () => {
	// given
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: undefined,
	})

	FakemonLocalStorage.add(fakemon.data)

	// when
	const result = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(result.readKey).toEqual("rrrrr")
	expect(result.writeKey).toBeUndefined()

	// when
	fakemon.data.writeKey = "wwwww"
	FakemonLocalStorage.add(fakemon.data)
	const resultAfterAddingWriteKey = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(resultAfterAddingWriteKey.readKey).toEqual("rrrrr")
	expect(resultAfterAddingWriteKey.writeKey).toEqual("wwwww")
})

test("removing", () => {
	// given
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: undefined,
	})

	FakemonLocalStorage.add(fakemon.data)

	// when
	const result = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(result.readKey).toEqual("rrrrr")

	// when
	FakemonLocalStorage.remove(fakemon.data.readKey)
	const resultAfterRemoval = FakemonLocalKeychain.get(fakemon.data.readKey)
	
	// then
	expect(resultAfterRemoval).toBeUndefined()
})
