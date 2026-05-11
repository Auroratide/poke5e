import { writable } from "svelte/store"
import { ErrorsDb } from "./ErrorsDb"
import { ErrorMessages } from "./ErrorMessages"

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
		ErrorsDb.report(action, error).then((id) => {
			set({
				hasError: true,
				message: ErrorMessages.simple(error),
				referenceId: id,
			})
		})
	},
	hide: () => update((prev) => ({
		...prev,
		hasError: false,
	})),
}
