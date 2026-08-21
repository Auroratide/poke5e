export function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isLargeScreen(): boolean {
	return window.matchMedia("screen and (min-width: 75rem)").matches
}

/**
 * True when the page shows its side and main columns side by side, which is the
 * breakpoint Page.svelte uses. Distinct from isLargeScreen, which is 75rem.
 */
export function isTwoColumn(): boolean {
	return window.matchMedia("screen and (min-width: 37.5rem)").matches
}
