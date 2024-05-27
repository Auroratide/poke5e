import type { LayoutLoad } from "./$types"

const getActiveSection = (url: URL) => {
	const match = url.pathname.match(/^\/([^/]*).*$/)
	if (match)
		return match[1]
	else
		return ""
}

export const load: LayoutLoad = async ({ url }) => {
	return {
		activeSection: getActiveSection(url),
	}
}

export const prerender = true