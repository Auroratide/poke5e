import { test, expect } from "vitest"
import { SpeciesIdentifier } from "../SpeciesIdentifier"

test("fakemon", () => {
	const id = SpeciesIdentifier.fromFakemonReadKey("key")
	expect(id.isFakemon()).toBe(true)
	
	const readKey = id.toFakemonReadKey()
	expect(readKey).toEqual("key")
})

test("not fakemon", () => {
	const id = SpeciesIdentifier.fromSpeciesName("eevee")
	expect(id.isFakemon()).toBe(false)
	
	expect(() => id.toFakemonReadKey()).toThrow()
})
