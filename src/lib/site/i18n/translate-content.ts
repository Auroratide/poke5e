import { getLocale } from "./paraglide/runtime"

type ContentMetadata = {
	title: string,
}

export async function translateContent(getTranslatedContent: (locale: string) => Promise<{
	default: ConstructorOfATypedSvelteComponent,
	metadata: Record<string, unknown>,
}>): Promise<{
	Content: ConstructorOfATypedSvelteComponent,
	metadata: ContentMetadata,
}> {
	const locale = getLocale()

	try {
		const content = await getTranslatedContent(locale)

		return {
			Content: content.default,
			metadata: content.metadata as ContentMetadata,
		}
	} catch (e) {
		const content = await getTranslatedContent("en")

		return {
			Content: content.default,
			metadata: content.metadata as ContentMetadata,
		}
	}
}
