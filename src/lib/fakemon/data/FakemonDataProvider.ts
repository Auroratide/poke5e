import type { SpeciesMedia, UploadedMedia } from "$lib/creatures/media"
import type { ImageInputValue } from "$lib/ui/forms"
import type { DraftFakemon, Fakemon } from "../Fakemon"

/**
 * 13 characters 0-9A-Z
 */
export type ReadKey = string

/**
 * 16 characters 0-9A-Z
 */
export type WriteKey = string

export interface FakemonDataProvider {
	getAllKnown(): Promise<Fakemon[]>
	getByReadKey(readKey: ReadKey): Promise<Fakemon | undefined>
	add(draft: DraftFakemon): Promise<Fakemon>
	update(fakemon: Fakemon): Promise<boolean>
	updateMedia(writeKey: WriteKey, media: SpeciesMedia<ImageInputValue>): Promise<SpeciesMedia<UploadedMedia>>
	verifyWriteKey(fakemon: Fakemon, writeKey: WriteKey): Promise<boolean>
}

export class FakemonDataProviderError extends Error {
	constructor(message: string) {
		super(message)
	}
}

export class FakemonPermissionError extends FakemonDataProviderError {
	constructor() {
		super("You do not have permission to edit this pokemon.")
	}
}
