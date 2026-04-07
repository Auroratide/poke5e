import { readable } from "svelte/store"
import type { MaintenanceWindow } from "./MaintenanceWindow"
import { browser } from "$app/environment"

const ONE_MINUTE = 60000

type MaintenanceWindowJson = {
	status: "none" | "upcoming" | "inprogress",
	scheduledStart?: string,
	duration?: string,
	reason?: string,
}

function getMaintenanceWindow(): Promise<MaintenanceWindow> {
	return fetch("/system/maintenance.json", {
		cache: "no-store",
	}).then((res) => res.json()).then((maintenance: MaintenanceWindowJson) => {
		return {
			status: maintenance.status,
			scheduledStart: maintenance.scheduledStart ? new Date(maintenance.scheduledStart) : undefined,
			duration: maintenance.duration,
			reason: maintenance.reason,
		} as MaintenanceWindow
	}).catch(() => {
		// do nothing
		return {
			status: "none",
		}
	})
}

export const MaintenanceStore = readable<MaintenanceWindow>({
	status: "none",
}, (set) => {
	if (browser) {
		getMaintenanceWindow().then((maintenance) => set(maintenance))

		const interval = window.setInterval(() => {
			getMaintenanceWindow().then((maintenance) => set(maintenance))
		}, ONE_MINUTE)

		return () => {
			window.clearInterval(interval)
		}
	}
})
