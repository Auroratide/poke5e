import { test, expect } from "vitest"
import { DeviceId, DEVICE_ID_STORAGE_KEY } from "../DeviceId"

test("new id", () => {
	localStorage.removeItem(DEVICE_ID_STORAGE_KEY)

	const id = DeviceId.get()

	expect(id).toBeDefined()
	expect(id.length).toBeGreaterThan(0)

	const secondTime = DeviceId.get()

	expect(secondTime).toEqual(id)
})

test("existing id", () => {
	localStorage.setItem(DEVICE_ID_STORAGE_KEY, "12345")

	const id = DeviceId.get()

	expect(id).toEqual("12345")
})
