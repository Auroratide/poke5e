export type MaintenanceStatus = "none" | "upcoming" | "inprogress"

export type MaintenanceWindow = {
	status: "none"
} | {
	status: "upcoming" | "inprogress",
	scheduledStart: Date,
	duration: string,
	reason: string,
}
