export const COMMON_HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
	"Access-Control-Request-Method": "POST",
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
	noContent: () => new Response(null, {
		status: 204,
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
