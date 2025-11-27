import { onNavigate } from "$app/navigation"
import { isLargeScreen, prefersReducedMotion } from "$lib/media"
import { animate } from "./animate"
import { None } from "./none"
import { Slide } from "./slide"
import { Wipe } from "./wipe"

/**
 * Note: Some of the isLargeScreen() conditions are to optimize performance
 * on mobile platforms. The animations are very stuttery otherwise.
 */
export function initializeTransitions() {
	onNavigate((navigation) => {
		if (!document.startViewTransition) return
		if (prefersReducedMotion()) return

		const hadBackdrop = document.querySelector("[data-transition-name=\"backdrop\"]") != null
		const oldBackiconName = document.querySelector("[data-transition-name=\"backicon\"] title")?.textContent
		const oldPageTheme = document.querySelector("#page-theme")?.className

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})

			transition.ready.then(() => {
				const willHaveBackdrop = document.querySelector("[data-transition-name=\"backdrop\"]") != null
				const newBackiconName = document.querySelector("[data-transition-name=\"backicon\"] title")?.textContent
				const newPageTheme = document.querySelector("#page-theme")?.className

				const themeChanged = oldPageTheme !== newPageTheme
				console.log("OLD", oldPageTheme)
				console.log("NEW", newPageTheme)

				animate({
					name: "staticpage",
					old: {
						keyframes: Slide.To.Bottom("2em"),
						duration: 175,
					},
					new: {
						keyframes: Slide.From.Bottom("2em"),
						duration: 250,
						delay: 100,
					},
				})

				if (themeChanged && !(!isLargeScreen() && hadBackdrop)) {
					animate({
						name: "backdrop",
						old: willHaveBackdrop ? {
							keyframes: None(),
							duration: 250,
						} : {
							keyframes: Slide.To.Left("50em"),
							duration: 250,
						},
						new: hadBackdrop ? {
							keyframes: Wipe.From.Left(),
							duration: 150,
						} : {
							keyframes: Slide.From.Left("50em"),
							duration: 250,
						},
					})
				}

				if (oldBackiconName !== newBackiconName && isLargeScreen()) {
					animate({
						name: "backicon",
						old: {
							keyframes: Slide.To.BottomRight("1em"),
							duration: 250,
						},
						new: {
							keyframes: Slide.From.BottomRight("1em"),
							duration: 250,
						},
					})
				}

				if (isLargeScreen()) {
					animate({
						name: "pagemain",
						old: {
							keyframes: Slide.To.Bottom("2em"),
							duration: 175,
						},
						new: {
							keyframes: Slide.From.Right("2em"),
							duration: 250,
							delay: 100,
						},
					})
				} else {
					animate({
						name: "pagemain",
						old: {
							keyframes: Slide.To.Bottom("2em"),
							duration: 175,
						},
						new: {
							keyframes: Slide.From.Top("2em"),
							duration: 250,
							delay: 100,
						},
					})
				}
			})
		})
	})
}
