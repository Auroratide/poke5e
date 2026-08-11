import type { EntryGenerator, RequestHandler } from "./$types"
import { respond, SRD_ENABLED } from "$lib/srd/util"
import { createIdEntryGenerator, isEdition } from "$lib/srd/editions"
import { error } from "@sveltejs/kit"
import { MovesSrd } from "$lib/srd/moves"

export const prerender = SRD_ENABLED
export const entries: EntryGenerator = createIdEntryGenerator(MovesSrd.ids)

export const GET: RequestHandler = async ({ params }) => {
	if (!isEdition(params.edition)) error(404)

	const value = await MovesSrd.one(params.id, params.edition)

	if (!value) error(404)
	return respond(value)
}
