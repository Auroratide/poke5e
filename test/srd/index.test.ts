import { expect, test, type APIRequestContext } from '@playwright/test'
import Ajv, { type ValidateFunction } from "ajv/dist/2020.js"

test("all endpoints match the openapi schema", async ({ request }) => {
	const openApiResponse = await request.get("/srd/v1/openapi.json")
	const openApiJson = await openApiResponse.json()
	const validatorFor = setupValidators(openApiJson)

	const editions: string[] = openApiJson.components.parameters.Edition.schema.enum

	const endpoints: [string, any][] = Object.entries(openApiJson.paths)
	const lists = endpoints.filter(([path]) => !path.includes("{id}"))
	const items = endpoints.filter(([path]) => path.includes("{id}"))

	// Scan the list endpoints first, so we can get valid ids to
	// then scan the item endpoints
	const sampleIds = new Map<string, string>()
	await Promise.all(lists.flatMap(([path, methods]) => editions.map(async (edition) => {
		const truePath = path.replace("{edition}", edition)
		const json = await validateEndpoint({
			path: truePath,
			request,
			validatorFor,
			methods,
		})

		sampleIds.set(`${methods.get.tags[0]}:${edition}`, json.values[0].id)
	})))

	await Promise.all(items.flatMap(([path, methods]) => editions.map(async (edition) => {
		const sampleId = sampleIds.get(`${methods.get.tags[0]}:${edition}`)
		const truePath = path.replace("{edition}", edition).replace("{id}", sampleId)
		const json = await validateEndpoint({
			path: truePath,
			request,
			validatorFor,
			methods,
		})
	})))
})

function setupValidators(schema: object) {
	const ajv = new Ajv({ strict: false })
	ajv.addSchema(schema, "openapi.json")

	const validators = new Map<string, ValidateFunction>()
	return (ref: string) => {
		if (!validators.has(ref)) {
			validators.set(ref, ajv.compile({ $ref: `openapi.json${ref}`}))
		}

		return validators.get(ref)!
	}
}

async function validateEndpoint({
	path,
	request,
	methods,
	validatorFor,
}: {
	path: string,
	request: APIRequestContext,
	methods: any,
	validatorFor: (ref: string) => ValidateFunction,
}) {
	const response = await request.get(path)
	expect(response.status(), path).toBe(200)

	const json = await response.json()
	const ref = methods.get.responses["200"].content["application/json"].schema.$ref

	const validate = validatorFor(ref)
	const valid = validate(json)

	expect(validate.errors ?? [], path).toEqual([])
	expect(valid, path).toBe(true)

	return json
}
