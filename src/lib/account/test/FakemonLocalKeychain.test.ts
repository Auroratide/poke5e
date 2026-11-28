import { test, expect } from "vitest"
import { FakemonLocalKeychain } from "../FakemonLocalKeychain"
import { stubFakemon } from "$lib/fakemon/test/stubs"

test("adding overwrites by read key", async () => {
	// given
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: undefined,
	})

	await FakemonLocalKeychain.add([fakemon.data])

	// when
	const result = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(result.readKey).toEqual("rrrrr")
	expect(result.writeKey).toBeUndefined()

	// when
	fakemon.data.writeKey = "wwwww"
	await FakemonLocalKeychain.add([fakemon.data])
	const resultAfterAddingWriteKey = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(resultAfterAddingWriteKey.readKey).toEqual("rrrrr")
	expect(resultAfterAddingWriteKey.writeKey).toEqual("wwwww")
})

test("unexpected value stored into local storage", () => {
	const readKey = "rrrrr"

	localStorage.setItem(`fakemon::${readKey}`, "Invalid value")

	const result = FakemonLocalKeychain.get(readKey)
	expect(result).toBeUndefined()
})

test("does not remove writeKey if already there", async () => {
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: "wwwww",
	})

	await FakemonLocalKeychain.add([fakemon.data])

	// when
	const result = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(result.readKey).toEqual("rrrrr")
	expect(result.writeKey).toEqual("wwwww")

	// when
	delete fakemon.data.writeKey
	await FakemonLocalKeychain.add([fakemon.data])

	// then
	const resultAfterSecondAdd = FakemonLocalKeychain.get(fakemon.data.readKey)

	expect(resultAfterSecondAdd.readKey).toEqual("rrrrr")
	expect(resultAfterSecondAdd.writeKey).toEqual("wwwww")
})

test("lists all", async () => {
	const drakeon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: "wwwww",
	})

	const eeveon  = stubFakemon({
		id: "54321",
		readKey: "sssss",
		writeKey: undefined,
	})

	await FakemonLocalKeychain.add([drakeon.data])
	await FakemonLocalKeychain.add([eeveon.data])

	localStorage.setItem("ignorethis", "{}")
	localStorage.setItem("fakemon::", "{}")

	// when
	const result = await FakemonLocalKeychain.list()

	// then
	expect(result).toContainEqual({
		readKey: "rrrrr",
		writeKey: "wwwww",
	})

	expect(result).toContainEqual({
		readKey: "sssss",
	})
})

test("removing", async () => {
	// given
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: undefined,
	})

	await FakemonLocalKeychain.add([fakemon.data])

	// when
	const result = FakemonLocalKeychain.get(fakemon.data.readKey)

	// then
	expect(result.readKey).toEqual("rrrrr")

	// when
	await FakemonLocalKeychain.remove(fakemon.data.readKey)
	const resultAfterRemoval = FakemonLocalKeychain.get(fakemon.data.readKey)
	
	// then
	expect(resultAfterRemoval).toBeUndefined()
})
