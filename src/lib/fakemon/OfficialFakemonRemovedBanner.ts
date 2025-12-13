import { browser } from "$app/environment"
import { writable } from "svelte/store"
import { FakemonLocalStorage } from "./data/FakemonLocalStorage"
import { goto } from "$app/navigation"
import { Url } from "$lib/url"

const key = "OfficialFakemonRemovedBanner"
const initialValue = browser ? localStorage.getItem(key) === "true" : undefined

export const OfficialFakemonRemovedBanner = writable<boolean | undefined>(initialValue)
if (browser) {
	OfficialFakemonRemovedBanner.subscribe((value) => localStorage.setItem(key, value.toString()))
}

export function readdOfficialFakemon() {
	FakemonLocalStorage.initializeOriginalOfficialFakemon()
	OfficialFakemonRemovedBanner.set(true)

	goto(Url.fakemon())
}