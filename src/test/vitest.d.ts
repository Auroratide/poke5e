/* eslint-disable */
import "vitest"

interface CustomMatchers<R = unknown> {
	toEqualData: (expected: unknown) => R
}

declare module "vitest" {
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
