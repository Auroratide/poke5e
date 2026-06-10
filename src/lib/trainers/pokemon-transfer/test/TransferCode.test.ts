import { test, expect } from "vitest"
import { TransferCode } from "../TransferCode"

test("transfer codes", () => {
	const code = TransferCode.from("ABCDE12345")
	expect(code).toEqual("T.ABCDE12345")

	const raw = TransferCode.raw(code)
	expect(raw).toEqual("ABCDE12345")
})
