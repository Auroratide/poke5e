import type { Handle } from "@sveltejs/kit"
import { paraglideMiddleware } from "$lib/site/i18n/paraglide/server"
import { baseLocale, locales } from "$lib/site/i18n/paraglide/runtime"

const paraglideHandle: Handle = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html
					.replace("%lang%", locale)
					.replace("%baseLocale%", baseLocale)
					.replace("%locales%", JSON.stringify(locales))
			},
		})
	})
}

export const handle: Handle = paraglideHandle