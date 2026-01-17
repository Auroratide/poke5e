import { getLocale } from "./paraglide/runtime"

type HasId = { id: string }

export async function translateData<T extends HasId>(items: T[], getTranslatedItems: (locale: string) => Promise<Partial<T>[]>, locale?: string): Promise<T[]> {
	locale = locale ?? getLocale()
	if (locale === "en") return items

	const translatedItems = await getTranslatedItems(locale)

	return items.map((item) => {
		const translatedItem = translatedItems.find((it) => it.id === item.id)

		return translatedItem != null ? {
			...item,
			...translatedItem,
		} : item
	})
}
