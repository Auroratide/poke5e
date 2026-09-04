import { Ability } from "$lib/pokemon/ability"
import { SrdClient } from "$lib/srd"
import type { Edition } from "$lib/srd/editions"
import type { PageLoad } from "./$types"

export const load: PageLoad<{
	values: Record<Edition, Ability[]>,
}> = async ({ fetch }) => {
	const values = await SrdClient.forEachEdition(async (client) => {
		const values = await client.abilities.all()

		return values.values
			.filter((it) => !it.deprecated)
			.map(Ability.fromJson)
	}, fetch)

	return { values }
}
