export class BackupError extends Error {
	constructor(message: string) {
		super("Failed to restore backup: " + message)
	}
}
