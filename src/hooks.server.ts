import type { Handle } from "@sveltejs/kit"
import { paraglideMiddleware } from "$lib/site/i18n/paraglide/server"

const paraglideHandle: Handle = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace("%lang%", locale)
			},
		})
	})
}

export const handle: Handle = paraglideHandle