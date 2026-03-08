import { writable } from "svelte/store"
import { ErrorsDb } from "./ErrorsDb"
import { DetailedError } from "./DetailedError"

export type ErrorMessage = {
	hasError: boolean,
	message: string,
	referenceId?: string,
}
const { subscribe, set, update } = writable<ErrorMessage>({
	hasError: false,
	message: "",
})

export const error = {
	subscribe,
	show: (action: string, error: Error) => {
		const simpleMessage = error.message
		const detailedMessage = error instanceof DetailedError ? error.details : simpleMessage

		ErrorsDb.report(action, detailedMessage).then((id) => {
			set({
				hasError: true,
				message: simpleMessage,
				referenceId: id,
			})
		})
	},
	hide: () => update((prev) => ({
		...prev,
		hasError: false,
	})),
}
