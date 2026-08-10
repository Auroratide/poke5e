import * as z from "zod"

export function respond(data: object): Response {
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function schema(data: any): object {
	return z.toJSONSchema(data)
}
