export const Slide = {
	From: {
		Bottom: (amount: string) => ({
			transform: [
				`translateY(${amount})`,
				"translateY(0)",
			],
			opacity: ["0", "1"],
		}),
		Left: (amount: string) => ({
			transform: [
				`translateX(-${amount})`,
				"translateX(0)",
			],
			opacity: ["0", "1"],
		}),
	},
	To: {
		Bottom: (amount: string) => ({
			transform: [
				"translateY(0)",
				`translateY(${amount})`,
			],
			opacity: ["1", "0"],
		}),
		Left: (amount: string) => ({
			transform: [
				"translateX(0)",
				`translateX(-${amount})`,
			],
			opacity: ["1", "0"],
		}),
	},
} as const
