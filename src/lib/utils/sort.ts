type HasName = {
	name: string
}

export const alphabeticalName = (a: HasName, b: HasName) => a.name.localeCompare(b.name)
