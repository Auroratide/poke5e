import { test, expect } from "vitest"
import { openApiDocument } from "../openapi"
import { validate } from "@readme/openapi-parser"

test("emits a valid openapi document", async () => {
	const result = await validate(structuredClone(openApiDocument()))

	// sorta silly, but makes typescript happy
	if (result.valid === false) {
		expect(result.errors ?? []).toEqual([])
	}

	expect(result.valid).toBe(true)
})
