export const abilities = (allAbilities: {
	id: string,
	name: string,
	description: string,
}[]) => (pokemon: {
	abilities: {
		id: string,
		hidden: boolean,
	}[]
}) => ({
	...pokemon,
	abilities: pokemon.abilities.map(ability => {
		const matchedAbility = allAbilities.find(it => ability.id === it.id)
		if (matchedAbility == null) {
			console.warn(`Missing ability: ${ability.id}`)
		}

		return {
			id: ability.id,
			name: matchedAbility.name,
			description: matchedAbility.description,
			hidden: ability.hidden,
		}
	}),
})
