import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { TrainerLocalStorage } from "$lib/trainers/data/TrainerLocalStorage"

async function createBackup(): Promise<Blob> {
	const trainers = TrainerLocalStorage.getReadKeys().map((it) => ({
		readKey: it,
		writeKey: TrainerLocalStorage.getWriteKey(it),
	}))

	const fakemon = FakemonLocalStorage.list()

	const backup = {
		fakemon,
		trainers,
	}

	return new Blob([JSON.stringify(backup)], { type: 'application/json' })
}

class BackupError extends Error {
	constructor(message: string) {
		super(message)
	}
}

async function restoreBackup(blob: Blob) {
	try {
		const rawData = await blob.text()
		const backup = JSON.parse(rawData)

		if (Array.isArray(backup.fakemon)) {
			backup.fakemon.map((it) => {
				FakemonLocalStorage.add(it)
			})
		}

		if (Array.isArray(backup.trainers)) {
			backup.trainers.map((it) => {
				TrainerLocalStorage.addReadKey(it.readKey)
				if (it.writeKey)
					TrainerLocalStorage.addWriteKey(it.readKey, it.writeKey)
			})
		}
	} catch (e) {
		console.error(e)
		throw new BackupError("Failed to restore backup: File was not formatted correctly.")
	}
}

export const LiteBackup = {
	create: createBackup,
	restore: restoreBackup,
} as const
