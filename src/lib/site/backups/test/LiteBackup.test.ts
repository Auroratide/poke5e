import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { TrainerLocalStorage } from "$lib/trainers/data/TrainerLocalStorage"
import { test, expect } from "vitest"
import { LiteBackup } from "../LiteBackup"

test("records fakemon and trainers", async () => {
	FakemonLocalStorage.add({
		id: "11111111-1111-1111-1111-111111111111",
		readKey: "fr1",
		writeKey: "fw1",
	})

	FakemonLocalStorage.add({
		id: "22222222-1111-1111-1111-111111111111",
		readKey: "fr2",
	})

	TrainerLocalStorage.addReadKey("tr1")
	TrainerLocalStorage.addWriteKey("tr1", "tw1")
	TrainerLocalStorage.addReadKey("tr2")

	const backup = await LiteBackup.create()

	localStorage.clear()

	expect(FakemonLocalStorage.get("fr1")).toBeUndefined()
	expect(FakemonLocalStorage.get("fr2")).toBeUndefined()
	expect(TrainerLocalStorage.getReadKeys()).toEqual([])

	await LiteBackup.restore(backup)

	expect(FakemonLocalStorage.get("fr1")).toEqual({
		id: "11111111-1111-1111-1111-111111111111",
		readKey: "fr1",
		writeKey: "fw1",
	})
	expect(FakemonLocalStorage.get("fr2")).toEqual({
		id: "22222222-1111-1111-1111-111111111111",
		readKey: "fr2",
	})
	expect(TrainerLocalStorage.getReadKeys()).toEqual(["tr1", "tr2"])
	expect(TrainerLocalStorage.getWriteKey("tr1")).toEqual("tw1")
	expect(TrainerLocalStorage.getWriteKey("tr2")).toBeNull()
})

// test("nothing is in storage", async () => {

// })

// test("restoring a badly formatted file", async () => {

// })
