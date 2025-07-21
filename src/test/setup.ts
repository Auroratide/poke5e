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
					? `expected ${this.utils.printReceived(received.data)} not to equal data of ${this.utils.printExpected(expected.data)}`
					: `expected ${this.utils.printReceived((received as DataClass<unknown>).data)} to equal data of ${this.utils.printExpected((expected as DataClass<unknown>).data)}`,
		}
	},
})
