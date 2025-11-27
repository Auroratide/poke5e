import { expect, test } from "vitest"
import { CURRENT_VERSION_STORAGE_KEY, shouldShowVersionHighlight } from "."

test("not stored in localstorage yet", () => {
	const currentVersion = "1.2.3"
	localStorage.removeItem(CURRENT_VERSION_STORAGE_KEY)

	const result = shouldShowVersionHighlight(currentVersion)

	expect(result).toBe(false)
	expect(localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)).toEqual(currentVersion)
})

test("version already matches", () => {
	const currentVersion = "1.2.3"
	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, currentVersion)

	const result = shouldShowVersionHighlight(currentVersion)

	expect(result).toBe(false)
})

test("version upgraded by a patch number", () => {
	const previousVersion = "1.2.3"
	const currentVersion = "1.2.4"
	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, previousVersion)

	const result = shouldShowVersionHighlight(currentVersion)

	// we don't care about patch versions
	expect(result).toBe(false)
	expect(localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)).toEqual(currentVersion)
})

test("version updated by a minor version", () => {
	const previousVersion = "1.2.3"
	const currentVersion = "1.3.0"
	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, previousVersion)

	const result = shouldShowVersionHighlight(currentVersion)

	// we do care about minor versions
	expect(result).toBe(true)
	expect(localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)).toEqual(currentVersion)
})

test("version updated by a major version", () => {
	const previousVersion = "1.2.3"
	const currentVersion = "2.0.0"
	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, previousVersion)

	const result = shouldShowVersionHighlight(currentVersion)

	// we do care about major versions
	expect(result).toBe(true)
	expect(localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)).toEqual(currentVersion)
})

test("local storage contained an invalid value somehow", () => {
	const currentVersion = "1.2.3"
	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, "letters?")

	const result = shouldShowVersionHighlight(currentVersion)

	expect(result).toBe(false)
	expect(localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)).toEqual(currentVersion)
})

test("local storage was blank instead of null", () => {
	const currentVersion = "1.2.3"
	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, "")

	const result = shouldShowVersionHighlight(currentVersion)

	expect(result).toBe(false)
	expect(localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)).toEqual(currentVersion)
})
