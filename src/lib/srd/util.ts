import * as z from "zod"

/**
 * Kill switch for the whole SRD surface while it's under construction.
 * Flip to `true` to start prerendering the endpoints again.
 */
export const SRD_ENABLED = false

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
