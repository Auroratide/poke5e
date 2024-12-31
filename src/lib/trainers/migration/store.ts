import { browser } from "$app/environment"
import { writable } from "svelte/store"
import type { MigrationStatus } from "./MigrationStatus"

const migrationStatusKey = "migrationStatus"
const initialStatus = browser ? localStorage.getItem(migrationStatusKey) as MigrationStatus : undefined

export const migrationStatus = writable<MigrationStatus>(initialStatus ?? "not started")
if (browser) {
	migrationStatus.subscribe((value) => localStorage.setItem(migrationStatusKey, value))
}
