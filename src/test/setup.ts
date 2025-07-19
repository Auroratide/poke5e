import { DataClass } from "$lib/DataClass"
import { expect } from "vitest"

expect.extend({
	toEqualData(received: unknown, expected: unknown) {
		const pass =
			received instanceof DataClass &&
			expected instanceof DataClass &&
			this.equals(received.data, expected.data)
		
		return {
			pass,
			message: () =>
				pass
					? `expected ${this.utils.printReceived(received)} not to equal data of ${this.utils.printExpected(expected)}`
					: `expected ${this.utils.printReceived(received)} to equal data of ${this.utils.printExpected(expected)}`,
		}
	},
})
