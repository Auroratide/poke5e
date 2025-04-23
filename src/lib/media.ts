export function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isLargeScreen(): boolean {
	return window.matchMedia("screen and (min-width: 75rem)").matches
}
