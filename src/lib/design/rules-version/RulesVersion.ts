import { writable } from "svelte/store"

export type RulesVersion = "2018" | "2024"

export const rulesVersion = writable<RulesVersion>("2024")
