import { browser } from "$app/environment"

export const DEVICE_ID_STORAGE_KEY = "deviceid"

/**
 * IMPORTANT NOTE: This ID is not used for anything auth-related.
 * For now its only use is error analytics.
 */
export type DeviceId = string

export const DeviceId = {
	get: (): DeviceId => {
		if (!browser) return ""

		let id = localStorage.getItem(DEVICE_ID_STORAGE_KEY)
		if (!id) {
			id = window.crypto.randomUUID()
			localStorage.setItem(DEVICE_ID_STORAGE_KEY, id)
		}

		return id
	},
} as const
