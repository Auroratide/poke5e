import { expect, test } from '@playwright/test'
import Ajv from "ajv/dist/2020.js"

test("biomes match published schema", async ({ request }) => {
	const [schemaRes, dataRes] = await Promise.all([
		request.get("/srd/v1/schema/biomes.json"),
		request.get("/srd/v1/2024/biomes.json"),
	])

	expect(schemaRes.status()).toBe(200)
	expect(dataRes.status()).toBe(200)

	const validate = new Ajv({ strict: false }).compile(await schemaRes.json())
	const valid = validate(await dataRes.json())

	expect(validate.errors ?? []).toEqual([])
	expect(valid).toBe(true)
})

test("moves match published schema", async ({ request }) => {
	const [schemaRes, dataRes] = await Promise.all([
		request.get("/srd/v1/schema/moves.json"),
		request.get("/srd/v1/2024/moves.json"),
	])

	expect(schemaRes.status()).toBe(200)
	expect(dataRes.status()).toBe(200)

	const validate = new Ajv({ strict: false }).compile(await schemaRes.json())
	const valid = validate(await dataRes.json())

	expect(validate.errors ?? []).toEqual([])
	expect(valid).toBe(true)
})