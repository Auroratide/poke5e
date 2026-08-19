export const EDITIONS = ["2018", "2024"] as const

export type Edition = (typeof EDITIONS)[number]

export function isEdition(v: string): v is Edition {
	return (EDITIONS as readonly string[]).includes(v)
}

export const createEntryGenerator = () => () => EDITIONS.map((edition) => ({ edition }))

/**
 * Entries for routes keyed by both edition and id, e.g. `[edition]/moves/[id].json`.
 * Ids are resolved per edition so this stays correct if the editions ever stop
 * sharing an id set.
 */
export const createIdEntryGenerator = (idsFor: (edition: Edition) => string[] | Promise<string[]>) => async () => {
	const perEdition = await Promise.all(
		EDITIONS.map(async (edition) => (await idsFor(edition)).map((id) => ({ edition, id }))),
	)

	return perEdition.flat()
}

type HasId = { id: string }

/**
 * An edition's diff against the primary edition. Every key is optional:
 * unspecified keys are inherited, and an explicit `null` deletes a key the
 * primary edition defines. Nested objects merge key by key; arrays and
 * primitives are replaced wholesale.
 */
export type EditionOverride<T> = T extends readonly unknown[]
	? T
	: T extends object
		? { [P in keyof T]?: EditionOverride<T[P]> | null }
		: T

export function chooseEditionData<T extends HasId>(edition: Edition, primaryValues: T[], editions: Partial<Record<Edition, (EditionOverride<T> & HasId)[]>>): T[] {
	const overrides = editions[edition]
	if (overrides == null) return primaryValues

	return primaryValues.map((value) => {
		const override = overrides.find((it) => it.id === value.id)
		return override != null
			? applyOverride(value, override as Record<string, unknown>)
			: value
	})
}

function applyOverride<T extends object>(original: T, override: Record<string, unknown>): T {
	const result = { ...original } as Record<string, unknown>

	for (const [key, overrideVal] of Object.entries(override)) {
		// Unspecified: inherit from the primary edition.
		if (overrideVal === undefined) continue

		// Explicit null: this edition drops the key entirely.
		if (overrideVal === null) {
			delete result[key]
			continue
		}

		const originalVal = result[key]
		result[key] = isPlainObject(originalVal) && isPlainObject(overrideVal)
			? applyOverride(originalVal, overrideVal)
			: overrideVal
	}

	return result as T
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype
}
