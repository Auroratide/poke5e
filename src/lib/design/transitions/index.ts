import { onNavigate } from "$app/navigation"
import { prefersReducedMotion } from "$lib/media"
import { animate } from "./animate"
import { None } from "./none"
import { Slide } from "./slide"
import { Wipe } from "./wipe"

export function initializeTransitions() {
	onNavigate((navigation) => {
		if (!document.startViewTransition) return
		if (prefersReducedMotion()) return

		const hadBackdrop = document.querySelector("[data-transition-name=\"backdrop\"]") != null
		const oldBackiconName = document.querySelector("[data-transition-name=\"backicon\"] title")?.textContent

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})

			transition.ready.then(() => {
				const willHaveBackdrop = document.querySelector("[data-transition-name=\"backdrop\"]") != null
				const newBackiconName = document.querySelector("[data-transition-name=\"backicon\"] title")?.textContent

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

				if (oldBackiconName !== newBackiconName) {
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
			})
		})
	})
}
