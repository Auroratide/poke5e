export type AnimationDescription = {
	name: string,
	old?: {
		keyframes: PropertyIndexedKeyframes,
		duration: number,
		delay?: number,
	},
	new?: {
		keyframes: PropertyIndexedKeyframes,
		duration: number,
		delay?: number,
	},
}

export function animate({
	name,
	old,
	new: mew,
}: AnimationDescription) {
	if (old != null) {
		document.documentElement.animate(old.keyframes, {
			duration: old.duration,
			delay: old.delay,
			easing: "ease-out",
			pseudoElement: `::view-transition-old(${name})`,
			fill: "forwards",
		})
	}

	if (mew != null) {
		document.documentElement.animate(mew.keyframes, {
			duration: mew.duration,
			delay: mew.delay,
			easing: "ease-out",
			pseudoElement: `::view-transition-new(${name})`,
			fill: "backwards",
		})
	}
}
