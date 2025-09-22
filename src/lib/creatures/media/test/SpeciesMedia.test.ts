import { test, expect, describe } from "vitest"
import { stubSpeciesMedia } from "./stubs"

describe("portrait", () => {
	test("non-shiny", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: "normal sprite",
				shinySprite: "shiny sprite",
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.portrait({ shiny: false })

		expect(result).toEqual({
			value: "normal portrait",
			hueRotate: 0,
		})
	})

	test("shiny", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: "normal sprite",
				shinySprite: "shiny sprite",
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.portrait({ shiny: true })

		expect(result).toEqual({
			value: "shiny portrait",
			hueRotate: 0,
		})
	})

	test("shiny with fallback", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: undefined,
				normalSprite: "normal sprite",
				shinySprite: "shiny sprite",
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.portrait({ shiny: true })

		expect(result).toEqual({
			value: "normal portrait",
			hueRotate: 100,
		})
	})
})

describe("sprite", () => {
	test("non-shiny", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: "normal sprite",
				shinySprite: "shiny sprite",
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.sprite({ shiny: false })

		expect(result).toEqual({
			value: "normal sprite",
			hueRotate: 0,
			portraitFallback: false,
		})
	})

	test("shiny", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: "normal sprite",
				shinySprite: "shiny sprite",
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.sprite({ shiny: true })

		expect(result).toEqual({
			value: "shiny sprite",
			hueRotate: 0,
			portraitFallback: false,
		})
	})

	test("shiny with normal sprite fallback", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: "normal sprite",
				shinySprite: undefined,
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.sprite({ shiny: true })

		expect(result).toEqual({
			value: "normal sprite",
			hueRotate: 100,
			portraitFallback: false,
		})
	})

	test("non-shiny with portrait fallback", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: undefined,
				shinySprite: undefined,
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.sprite({ shiny: false })

		expect(result).toEqual({
			value: "normal portrait",
			hueRotate: 0,
			portraitFallback: true,
		})
	})

	test("shiny with portrait fallback", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: "shiny portrait",
				normalSprite: undefined,
				shinySprite: undefined,
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.sprite({ shiny: true })

		expect(result).toEqual({
			value: "shiny portrait",
			hueRotate: 0,
			portraitFallback: true,
		})
	})

	test("shiny with normal portrait fallback", () => {
		const media = stubSpeciesMedia<string>({
			values: {
				normalPortrait: "normal portrait",
				shinyPortrait: undefined,
				normalSprite: undefined,
				shinySprite: undefined,
			},
			customization: {
				shinyHue: 100,
			},
		})

		const result = media.sprite({ shiny: true })

		expect(result).toEqual({
			value: "normal portrait",
			hueRotate: 100,
			portraitFallback: true,
		})
	})
})