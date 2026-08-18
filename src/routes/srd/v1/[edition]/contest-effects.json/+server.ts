import type { EntryGenerator, RequestHandler } from "./$types"
import { respond, SRD_ENABLED } from "$lib/srd/util"
import { createEntryGenerator, isEdition } from "$lib/srd/editions"
import { error } from "@sveltejs/kit"
import { ContestEffectsSrd } from "$lib/srd/contest-effects/server"

export const prerender = SRD_ENABLED
export const entries: EntryGenerator = createEntryGenerator()

export const GET: RequestHandler = async ({ params }) => {
	if (!isEdition(params.edition)) error(404)
	
	return respond(await ContestEffectsSrd.all(params.edition))
}
