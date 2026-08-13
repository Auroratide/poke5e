import { getLocale } from "./paraglide/runtime"
import type { DeepPartial } from "$lib/utils/types"

type Translatable = { id: string, name?: string, aliases?: string[] }

export async function translateData<T extends Translatable>(items: T[], getTranslatedItems: (locale: string) => Promise<DeepPartial<T>[]>, locale?: string): Promise<T[]> {
	locale = locale ?? getLocale()
	if (locale === "en") return items

	let translatedItems: DeepPartial<T>[] | T[] = []
	try {
		translatedItems = await getTranslatedItems(locale)
	} catch {
		translatedItems = items
	}

	return items.map((item) => {
		const translatedItem = translatedItems.find((it) => it.id === item.id)
		return translatedItem != null ? withEnglishAlias(deepMerge(item, translatedItem as T), item) : item
	})
}

/**
 * Retains the English name as an alias so localized lists stay searchable in either
 * language. Locale overlays never need to spell this out; any aliases they do declare
 * are kept alongside it.
 */
function withEnglishAlias<T extends Translatable>(translated: T, original: T): T {
	if (original.name == null || translated.name === original.name) return translated

	return { ...translated, aliases: [...(translated.aliases ?? []), original.name] }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype
}

function deepMerge<T extends object>(original: T, override: T): T {
	const result = { ...original }

	for (const key of Object.keys(override) as (keyof T)[]) {
		const originalVal = original[key]
		const overrideVal = override[key]

		if (overrideVal === undefined) continue

		result[key] = isPlainObject(originalVal) && isPlainObject(overrideVal)
			? deepMerge(originalVal, overrideVal) as T[typeof key]
			: overrideVal as T[typeof key]
	}

	return result
}