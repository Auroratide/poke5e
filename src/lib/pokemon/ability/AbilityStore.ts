import { srdStore } from "$lib/site/stores"
import { Ability } from "."

export type AbilityJson = {
	id: string,
	name: string,
	aliases?: string[],
	description: string,
	deprecated?: boolean,
}

export const AbilityStore = srdStore((client) => 
	client.abilities.all()
		.then((data) => data.values.map(Ability.fromJson)),
)
