import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { TrainerLocalStorage } from "$lib/trainers/data/TrainerLocalStorage"

function createBackup(): string {
	const trainers = TrainerLocalStorage.getReadKeys().map((it) => ({
		readKey: it,
		writeKey: TrainerLocalStorage.getWriteKey(it),
	}))

	const fakemon = FakemonLocalStorage.list()

	const toCopy = `# Trainers\n\nTrainer ID   | Access Key\n-------------|-----------------\n${trainers.map((it) => `${it.readKey} | ${it.writeKey ?? ""}`).join("\n")}\n\n\n# Fakemon\n\nFakemon ID      | Access Key\n----------------|-----------------\n${fakemon.map((it) => `F.${it.readKey} | ${it.writeKey ?? ""}`).join("\n")}`

	return toCopy
}

export const ManualBackup = {
	create: createBackup,
} as const
