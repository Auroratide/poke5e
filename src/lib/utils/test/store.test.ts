import { readable } from "svelte/store"
import { describe, test, expect } from "vitest"
import { getWhenDefined } from "../store"

describe("getWhenDefined", () => {
	test("waits for definition before returning", async () => {
		let defineStore: (value: string) => void = () => {}

		const someAsyncStore = readable<string | undefined>(undefined, (set) => {
			defineStore = (value: string) => {
				set(value)
			}
		})

		const promisedValue = getWhenDefined(someAsyncStore)
		defineStore("Expected Value")

		const actualValue = await promisedValue

		expect(actualValue).toEqual("Expected Value")
	})
})
