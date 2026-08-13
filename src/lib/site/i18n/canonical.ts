import { getLocale } from "./paraglide/runtime"
import german from "./canonical/de.json"

type CanonicalCategory = keyof typeof german
const localized = { de: german } as const

export function canonicalName(category: CanonicalCategory, id: string, locale = getLocale()): string {
	const values = localized[locale as keyof typeof localized]?.[category] as Record<string, string> | undefined
	return values?.[id] ?? id
}
