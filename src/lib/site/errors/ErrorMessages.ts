import { DetailedError } from "./DetailedError"

function getCauseMessage(error: Error): string {
	const cause = error.cause
	if (cause == null) return "No antecedent cause"
	if (cause instanceof Error) return cause.message
	if (typeof cause === "string") return cause

	return "Unknown cause message"
}

export const ErrorMessages = {
	simple(error: unknown): string {
		if (typeof error === "string") return error
		if (error instanceof DetailedError) return error.message
		if (error instanceof Error) return error.message

		return `${error}`
	},
	detailed(error: unknown): string {
		if (typeof error === "string") return error
		if (error instanceof DetailedError) `${error.message}; ${error.details}; Cause: ${getCauseMessage(error)}`
		if (error instanceof Error) return `${error.message}; Cause: ${getCauseMessage(error)}`

		return `${error}`
	},
} as const
