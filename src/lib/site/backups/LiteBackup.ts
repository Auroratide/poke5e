import type { Data } from "$lib/DataClass"
import type { Fakemon } from "$lib/fakemon"
import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { TrainerLocalStorage } from "$lib/trainers/data/TrainerLocalStorage"
import type { Trainer, WithWriteKey } from "$lib/trainers/types"
import { Url } from "../url"
import { BackupError } from "./BackupError"
import { fakemonStore } from "$lib/fakemon/store"
import { trainers } from "$lib/trainers/trainers"

export type LiteBackup = {
	$schema: string,
	createdAt: string,
	fakemon: Pick<Data<Fakemon>, "id" | "readKey" | "writeKey">[],
	trainers: Pick<Trainer & Partial<WithWriteKey>, "readKey" | "writeKey">[],
}

async function createBackup(): Promise<Blob> {
	const trainers = TrainerLocalStorage.getReadKeys().map((it) => ({
		readKey: it,
		writeKey: TrainerLocalStorage.getWriteKey(it),
	}))

	const fakemon = FakemonLocalStorage.list()

	const backup: LiteBackup = {
		$schema: Url.backups.schemas["202602"](),
		createdAt: new Date().toISOString(),
		fakemon,
		trainers,
	}

	return new Blob([JSON.stringify(backup)], { type: "application/json" })
}

function validate(json: object): json is LiteBackup {
	const errors = []

	if ("fakemon" in json) {
		if (!Array.isArray(json.fakemon)) {
			errors.push("fakemon is not an array")
		} else if (json.fakemon.some((it) => !("id" in it) || !("readKey" in it))) {
			errors.push("fakemon require id and readKey")
		}
	} else {
		errors.push("fakemon is required")
	}

	if ("trainers" in json) {
		if (!Array.isArray(json.trainers)) {
			errors.push("trainers is not an array")
		} else if (json.trainers.some((it) => !("readKey" in it))) {
			errors.push("trainers require readKey")
		}
	} else {
		errors.push("trainers is required")
	}

	if (errors.length > 0) {
		throw new BackupError(errors.join("; "))
	}

	return true
}

async function restoreBackup(blob: Blob): Promise<{
	trainers: number,
	fakemon: number,
}> {
	let backup: object = {}
	try {
		const rawData = await blob.text()
		backup = JSON.parse(rawData)
	} catch (e) {
		console.error(e)
		throw new BackupError("Backup file has the wrong format.")
	}

	if (validate(backup)) {
		backup.fakemon.map((it) => {
			FakemonLocalStorage.add(it)
		})

		backup.trainers.map((it) => {
			TrainerLocalStorage.addReadKey(it.readKey)
			if (it.writeKey)
				TrainerLocalStorage.addWriteKey(it.readKey, it.writeKey)
		})

		const foundFakemon = (await Promise.all(backup.fakemon.map((it) => {
			return fakemonStore.get(it.readKey)
		}))).filter((it) => it != null)

		const foundtrainers = (await Promise.all(backup.trainers.map((it) => {
			return trainers.get(it.readKey)
		}))).filter((it) => it != null)

		return {
			trainers: foundtrainers.length,
			fakemon: foundFakemon.length,
		}
	}
}

export const LiteBackup = {
	create: createBackup,
	restore: restoreBackup,
} as const
