export const Wipe = {
	From: {
		Left: () => ({
			clipPath: [
				"polygon(0% 0%, calc(100% - 50vw) 0%, calc(100% - 50vw) 100%, 0% 100%)",
				"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			],
			opacity: ["1", "1"],
		}),
		Top: () => ({
			clipPath: [
				"inset(0 0 100% 0)",
				"inset(0)",
			],
			opacity: ["1", "1"],
		}),
	},
	To: {
		Left: (amount: string) => ({
			transform: [
				"translateX(0)",
				`translateX(-${amount})`,
			],
			opacity: ["1", "0"],
		}),
		Bottom: () => ({
			clipPath: [
				"inset(0)",
				"inset(100% 0 0 0)",
			],
			opacity: ["1", "1"],
		}),
	},
} as const
