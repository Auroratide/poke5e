import { getLocale } from "./paraglide/runtime"

type HasId = { id: string }

export async function translateData<T extends HasId>(items: T[], getTranslatedItems: (locale: string) => Promise<Partial<T>[]>, locale?: string): Promise<T[]> {
	locale = locale ?? getLocale()
	if (locale === "en") return items

	let translatedItems: Partial<T>[] = []
	try {
		translatedItems = await getTranslatedItems(locale)
	} catch (_) {
		translatedItems = items
	}

	return items.map((item) => {
		const translatedItem = translatedItems.find((it) => it.id === item.id)

		return translatedItem != null ? {
			...item,
			...translatedItem,
		} : item
	})
}
