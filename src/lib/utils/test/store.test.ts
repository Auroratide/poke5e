import { readable } from "svelte/store"
import { describe, test, expect } from "vitest"
import { getWhenDefined } from "../store"
import type { Fetched } from "$lib/site/stores"

describe("getWhenDefined", () => {
	test("waits for definition before returning", async () => {
		let defineStore: (value: string) => void = () => {}

		const someAsyncStore = readable<Fetched<string>>({
			result: undefined,
			fetching: true,
			error: undefined,
		}, (set) => {
			defineStore = (value: string) => {
				set({
					result: value,
					fetching: false,
					error: undefined,
				})
			}
		})

		const promisedValue = getWhenDefined(someAsyncStore, "server value")
		defineStore("Expected Value")

		const actualValue = await promisedValue

		expect(actualValue).toEqual("Expected Value")
	})
})
