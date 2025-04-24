/**
 * Note: this is impure. It will update localstorage so the next call will
 * return false if it returned true before.
 */
export function shouldShowVersionHighlight(currentVersionStr: string): boolean {
	const previousVersionStr = localStorage.getItem(CURRENT_VERSION_STORAGE_KEY)
	const previousVersion = parseVersion(previousVersionStr)
	const currentVersion = parseVersion(currentVersionStr)

	localStorage.setItem(CURRENT_VERSION_STORAGE_KEY, currentVersionStr)

	if (previousVersion == null) {
		return false
	}

	return currentVersion[0] > previousVersion[0] || currentVersion[1] > previousVersion[1]
}

const parseVersion = (version: string | null) =>
	version
		?.match(/(\d+)\.(\d+)\.(\d+)/)
		?.slice(1, 4)
		.map((it) => parseInt(it)) as [number, number, number]

export const CURRENT_VERSION_STORAGE_KEY = "current-version"
