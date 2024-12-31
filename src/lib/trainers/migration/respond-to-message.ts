import { migrationStatus } from "./store"
import { OLD_ORIGIN } from "./origins"
import { trainers } from "../trainers"
import { getReadKeys } from "../data/supabase"

type MigrationMessageData = "failed" | "manual" | [string, string][]

export function respondToMessage(event: MessageEvent<MigrationMessageData>) {
	if (event.origin !== OLD_ORIGIN) return
	if (!Array.isArray(event.data)) {
		migrationStatus.set(event.data)
	} else {
		console.log("Migrating:", event.data)
		const existingKeys = getReadKeys()
		const migratedKeys = event.data.find((it) => it[0] === "trainers")?.[1]?.split(",")?.filter((it) => it !== "") ?? []
		const combinedKeys = combineListsNoRepeats(existingKeys, migratedKeys)
		localStorage.setItem("trainers", combinedKeys.join(","))

		event.data.filter((it) => it[0] !== "trainers").forEach(([key, value]) => {
			localStorage.setItem(key, value)
		})

		// The store's pretty complicated, but essentially to force trainers into state,
		// we have to explicitly subscribe to them, hence the subscribe/unsubscribe in the code
		Promise.all(getReadKeys().map((key) => trainers.get(key))).then((trainers) => {
			trainers.forEach((it) => {
				const unsubscribe = it.subscribe(() => {})
				unsubscribe()
			})
			migrationStatus.set("done")
			console.log("Done migrating.")
		}).catch((e) => {
			console.error(e)
			migrationStatus.set("failed")
		})
	}
}

function combineListsNoRepeats(a: string[], b: string[]): string[] {
	return Array.from(new Set<string>(a.concat(b)))
}
