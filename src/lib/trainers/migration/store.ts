import { browser } from "$app/environment"
import { writable } from "svelte/store"
import type { MigrationStatus } from "./MigrationStatus"

const migrationStatusKey = "migrationStatus"
const initialStatus = browser ? localStorage.getItem(migrationStatusKey) as MigrationStatus : undefined

export const migrationStatus = writable<MigrationStatus>(initialStatus ?? "not started")
if (browser) {
	migrationStatus.subscribe((value) => localStorage.setItem(migrationStatusKey, value))
}

const seenTrainerRecoveryKey = "seenTrainerRecovery"
const initialSeenTrainerRecovery = browser ? localStorage.getItem(seenTrainerRecoveryKey) === "true" : undefined

export const seenTrainerRecovery = writable<boolean>(initialSeenTrainerRecovery ?? false)
if (browser) {
	seenTrainerRecovery.subscribe((value) => localStorage.setItem(seenTrainerRecoveryKey, value.toString()))
}
