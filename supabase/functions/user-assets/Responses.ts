export const CONTENT_HEADERS = {
	"Content-Type": "application/json",
}

export const CORS_HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
	"Access-Control-Allow-Methods": "*",
}

export type ErrorResponseBody = {
	message: string,
}

export const Responses = {
	ok: (response: object) => new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			...CONTENT_HEADERS,
			...CORS_HEADERS,
		},
	}),
	noContent: () => new Response(null, {
		status: 204,
		headers: {
			...CORS_HEADERS,
		},
	}),
	badRequest: (response: ErrorResponseBody) => new Response(JSON.stringify(response), {
		status: 400,
		headers: {
			...CONTENT_HEADERS,
			...CORS_HEADERS,
		},
	}),
	methodNotAllowed: () => new Response("", {
		status: 405,
		headers: {
			...CORS_HEADERS,
		},
	}),
	internalServerError: (response: ErrorResponseBody) => new Response(JSON.stringify(response), {
		status: 500,
		headers: {
			...CONTENT_HEADERS,
			...CORS_HEADERS,
		},
	}),
}
