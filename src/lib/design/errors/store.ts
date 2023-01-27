import { writable } from 'svelte/store'

export type ErrorMessage = {
    hasError: boolean,
    message: string,
}
const { subscribe, set, update } = writable<ErrorMessage>({
    hasError: false,
    message: '',
})

export const error = {
    subscribe,
    show: (message: string) => set({
        hasError: true,
        message,
    }),
    hide: () => update((prev) => ({
        ...prev,
        hasError: false,
    })),
}
