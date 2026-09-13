import type { MoveJson } from "$lib/srd/moves/schema"
import type { ContestJson } from "$lib/srd/contest/schema"
import type { MoveId } from "./Move"
import { MovePower } from "./MovePower"
import { MoveRange } from "./range"
import { MoveShape } from "./shape"
import { MoveTime } from "./time"
import type { TmDetails } from "./tms/TmDetails"
import type { MoveType } from "./type"
import type { BetaDetails } from "$lib/site/beta"

/**
 * Projection of Move to remove unused fields during SSR
 */
export type MoveListing = {
	id: MoveId,
	name: string,
	aliases: string[],
	type: MoveType,
	power: MovePower,
	pp: number,
	time: MoveTime,
	range: MoveRange,
	shape?: MoveShape,
	/** Never populated by a listing: TMs are their own SRD resource, and the list shows none. */
	tm?: TmDetails,
	contest?: ContestListing,
	updated?: BetaDetails,
}

/**
 * Only which contest a move belongs to — the list filters on that, and never
 * shows appeal, jam, or effect text. `ContestDetails` satisfies it, so a Move
 * from the store still fits a MoveListing.
 */
export type ContestListing = Pick<ContestJson, "contest">

export type MoveListingJson = Pick<MoveJson,
	"id" | "name" | "aliases" | "type" | "power" | "pp" | "time" | "range" | "shape" | "updated">
	& { contest?: ContestListing }

const LISTING_FIELDS = ["id", "name", "aliases", "type", "power", "pp", "time", "range", "shape", "updated"] as const

export const MoveListing = {
	/**
	 * strips the SRD json of things not needed during SSR to reduce payload size
	 */
	project: (json: MoveJson, contest?: ContestJson): MoveListingJson => ({
		...Object.fromEntries(
			LISTING_FIELDS
				.filter((field) => json[field] !== undefined)
				.map((field) => [field, json[field]]),
		) as MoveListingJson,
		contest: contest != null ? { contest: contest.contest } : undefined,
	}),

	fromJson: (json: MoveListingJson): MoveListing => ({
		id: json.id,
		name: json.name,
		aliases: json.aliases ?? [],
		type: json.type,
		power: new MovePower(json.power),
		pp: json.pp,
		time: MoveTime.fromJson(json.time),
		range: MoveRange.fromJson(json.range),
		shape: MoveShape.fromJson(json.shape),
		contest: json.contest,
		updated: json.updated,
	}),
}
