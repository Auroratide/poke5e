import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { TrainerLocalStorage } from "$lib/trainers/data/TrainerLocalStorage"
import { test, expect, beforeEach, describe } from "vitest"
import { LiteBackup } from "../LiteBackup"
import { BackupError } from "../BackupError"

beforeEach(() => {
	localStorage.clear()
})

test("records fakemon and trainers", async () => {
	// given: data in storage
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

	// when: backup created and restored
	const backup = await LiteBackup.create()

	localStorage.clear()

	expect(FakemonLocalStorage.get("fr1")).toBeUndefined()
	expect(FakemonLocalStorage.get("fr2")).toBeUndefined()
	expect(TrainerLocalStorage.getReadKeys()).toEqual([])

	await LiteBackup.restore(backup)

	// then: data comes back
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

test("nothing is in storage", async () => {
	const backup = await LiteBackup.create()
	await LiteBackup.restore(backup)

	expect(FakemonLocalStorage.list()).toEqual([])
	expect(TrainerLocalStorage.getReadKeys()).toEqual([])
})

test("existing records are not overwritten", async () => {
	// given: a backup
	FakemonLocalStorage.add({
		id: "11111111-1111-1111-1111-111111111111",
		readKey: "fr1",
		writeKey: "fw1",
	})

	TrainerLocalStorage.addReadKey("tr1")
	TrainerLocalStorage.addWriteKey("tr1", "tw1")

	const backup = await LiteBackup.create()

	localStorage.clear()

	// and: fakemon/trainers in storage
	FakemonLocalStorage.add({
		id: "22222222-1111-1111-1111-111111111111",
		readKey: "fr2",
	})
	TrainerLocalStorage.addReadKey("tr2")

	// when
	await LiteBackup.restore(backup)

	// then: everything is there
	expect(FakemonLocalStorage.get("fr1")).toEqual({
		id: "11111111-1111-1111-1111-111111111111",
		readKey: "fr1",
		writeKey: "fw1",
	})
	expect(FakemonLocalStorage.get("fr2")).toEqual({
		id: "22222222-1111-1111-1111-111111111111",
		readKey: "fr2",
	})
	expect(TrainerLocalStorage.getReadKeys()).toEqual(["tr2", "tr1"])
	expect(TrainerLocalStorage.getWriteKey("tr1")).toEqual("tw1")
	expect(TrainerLocalStorage.getWriteKey("tr2")).toBeNull()
})

describe("bad formats", () => {
	const createBackup = (json: object) => new Blob([JSON.stringify(json)], { type: 'application/json' })

	test("fakemon is not a list", async () => {
		const backup = createBackup({
			fakemon: {
				id: "0",
				readKey: "r",
				writeKey: "w"
			},
			trainers: [],
		})

		await expect(LiteBackup.restore(backup)).rejects.toThrow(BackupError)
	})

	test("trainers is not a list", async () => {
		const backup = createBackup({
			trainers: {
				readKey: "r",
				writeKey: "w"
			},
			fakemon: [],
		})

		await expect(LiteBackup.restore(backup)).rejects.toThrow(BackupError)
	})

	test("fakemon missing read keys", async () => {
		const backup = createBackup({
			fakemon: [ {
				id: "id"
			} ],
			trainers: [],
		})

		await expect(LiteBackup.restore(backup)).rejects.toThrow(BackupError)
	})

	test("trainers missing read keys", async () => {
		const backup = createBackup({
			trainers: [ {} ],
			fakemon: [],
		})

		await expect(LiteBackup.restore(backup)).rejects.toThrow(BackupError)
	})

	test("is not a json object", async () => {
		const backup = new Blob(["data"], { type: 'image/png' })

		await expect(LiteBackup.restore(backup)).rejects.toThrow(BackupError)
	})
})
