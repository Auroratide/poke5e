import { Responses } from "./Responses.ts"

export function handleCors(req: Request, next: (req: Request) => Promise<Response>): Promise<Response> {
	if (req.method === "OPTIONS") {
		return Promise.resolve(Responses.noContent())
	}

	return next(req)
}
