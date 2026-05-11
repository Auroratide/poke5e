import { browser } from "$app/environment"

export const DEVICE_ID_STORAGE_KEY = "deviceid"

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
