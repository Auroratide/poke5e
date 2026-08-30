import { test, expect, describe } from "vitest"
import { stringsAlike, kebabToTitleText } from "../string"

describe("stringsAlike", () => {
	test("exact match", () => {
		const result = stringsAlike("hello", "hello")
		expect(result).toBe(true)
	})

	test("case insensitive", () => {
		const result = stringsAlike("hello", "HeLlO")
		expect(result).toBe(true)
	})

	test("partial match", () => {
		const result = stringsAlike("hello", "ell")
		expect(result).toBe(true)
	})

	test("empty string", () => {
		const result = stringsAlike("hello", "")
		expect(result).toBe(true)
	})

	test("no match", () => {
		const result = stringsAlike("hello", "world")
		expect(result).toBe(false)
	})
})

describe("kebabToTitleText", () => {
	test("empty string", () => {
		const result = kebabToTitleText("")

		expect(result).toEqual("")
	})

	test("single word", () => {
		const result = kebabToTitleText("words")

		expect(result).toEqual("Words")
	})

	test("multiple words", () => {
		const result = kebabToTitleText("multiple-words-here")

		expect(result).toEqual("Multiple Words Here")
	})
})
