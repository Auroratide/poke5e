export const COMMON_HEADERS = {
	"Content-Type": "application/json",
}

export type ErrorResponseBody = {
	message: string,
}

export const Responses = {
	ok: (response: object) => new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			...COMMON_HEADERS,
		},
	}),
	badRequest: (response: ErrorResponseBody) => new Response(JSON.stringify(response), {
		status: 400,
		headers: {
			...COMMON_HEADERS,
		},
	}),
	methodNotAllowed: () => new Response("", {
		status: 405,
		headers: {
			...COMMON_HEADERS,
		},
	}),
	internalServerError: (response: ErrorResponseBody) => new Response(JSON.stringify(response), {
		status: 500,
		headers: {
			...COMMON_HEADERS,
		},
	}),
}
