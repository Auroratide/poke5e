import { test, expect } from "vitest"
import { FakemonLocalStorage } from "../FakemonLocalStorage"
import { stubFakemon } from "$lib/fakemon/test/stubs"

test("adding overwrites by read key", () => {
	// given
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: undefined,
	})

	FakemonLocalStorage.add(fakemon.data)

	// when
	const result = FakemonLocalStorage.get(fakemon.data.readKey)

	// then
	expect(result.id).toEqual("12345")
	expect(result.readKey).toEqual("rrrrr")
	expect(result.writeKey).toBeUndefined()

	// when
	fakemon.data.writeKey = "wwwww"
	FakemonLocalStorage.add(fakemon.data)
	const resultAfterAddingWriteKey = FakemonLocalStorage.get(fakemon.data.readKey)

	// then
	expect(resultAfterAddingWriteKey.id).toEqual("12345")
	expect(resultAfterAddingWriteKey.readKey).toEqual("rrrrr")
	expect(resultAfterAddingWriteKey.writeKey).toEqual("wwwww")
})

test("unexpected value stored into local storage", () => {
	const readKey = "rrrrr"

	localStorage.setItem(`fakemon::${readKey}`, "Invalid value")

	const result = FakemonLocalStorage.get(readKey)
	expect(result).toBeUndefined()
})

test("does not remove writeKey if already there", () => {
	const fakemon = stubFakemon({
		id: "12345",
		readKey: "rrrrr",
		writeKey: "wwwww",
	})

	FakemonLocalStorage.add(fakemon.data)

	// when
	const result = FakemonLocalStorage.get(fakemon.data.readKey)

	// then
	expect(result.id).toEqual("12345")
	expect(result.readKey).toEqual("rrrrr")
	expect(result.writeKey).toEqual("wwwww")

	// when
	delete fakemon.data.writeKey
	FakemonLocalStorage.add(fakemon.data)

	// then
	const resultAfterSecondAdd = FakemonLocalStorage.get(fakemon.data.readKey)

	expect(resultAfterSecondAdd.id).toEqual("12345")
	expect(resultAfterSecondAdd.readKey).toEqual("rrrrr")
	expect(resultAfterSecondAdd.writeKey).toEqual("wwwww")
})

test("lists all", () => {
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

	FakemonLocalStorage.add(drakeon.data)
	FakemonLocalStorage.add(eeveon.data)

	localStorage.setItem("ignorethis", "{}")
	localStorage.setItem("fakemon::", "{}")

	// when
	const result = FakemonLocalStorage.list()

	// then
	expect(result).toContainEqual({
		id: "12345",
		readKey: "rrrrr",
		writeKey: "wwwww",
	})

	expect(result).toContainEqual({
		id: "54321",
		readKey: "sssss",
	})
})
