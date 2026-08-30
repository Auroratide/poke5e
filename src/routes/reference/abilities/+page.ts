import { Ability } from "$lib/pokemon/ability"
import { SrdClient } from "$lib/srd"
import type { PageLoad } from "./$types"

export const load: PageLoad<{
	values: {
		"2018": Ability[],
		"2024": Ability[],
	},
}> = async ({ fetch }) => {
	const client2018 = new SrdClient("2018", fetch)
	const client2024 = new SrdClient("2024", fetch)

	const [values2018, values2024] = await Promise.all([
		client2018.abilities.all(),
		client2024.abilities.all(),
	])

	return {
		values: {
			"2018": values2018.values
				.filter((it) => !it.deprecated)
				.map(Ability.fromJson),
			"2024": values2024.values
				.filter((it) => !it.deprecated)
				.map(Ability.fromJson),
		},
	}
}
