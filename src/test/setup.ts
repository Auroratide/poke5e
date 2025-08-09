import { DataClass } from "$lib/DataClass"
import { expect, beforeEach } from "vitest"

beforeEach(() => {
	localStorage.clear()
})

expect.extend({
	toEqualData(received: unknown, expected: unknown) {
		const pass =
			received instanceof DataClass &&
			expected instanceof DataClass &&
			this.equals(received.data, expected.data)
		
		if (!pass) {
			return {
				pass,
				message: () => {
					const receivedData = (received as DataClass<unknown>).data
					const expectedData = (expected as DataClass<unknown>).data

					const diffString = this.utils.diff(expectedData, receivedData, {
						expand: this.expand,
					})

					return `expected data objects to be equal\n\n${diffString ? diffString : `Expected: ${this.utils.printExpected(expectedData)}\nReceived: ${this.utils.printReceived(receivedData)}`}`
				},
			}
		}

		return {
			pass,
			message: () =>
				`expected ${this.utils.printReceived(received.data)} not to equal data of ${this.utils.printExpected(expected.data)}`,
		}
	},
})
