export const StandardNature = {
	Reckless: {
		effect: {
			str: 2,
			dex: -2,
		},
	},
	Rash: {
		effect: {
			str: 2,
			con: -2,
		},
	},
	Brave: {
		effect: {
			str: 2,
			wis: -2,
		},
	},
	Arrogant: {
		effect: {
			str: 2,
			cha: -2,
		},
	},

	Skittish: {
		effect: {
			dex: 2,
			str: -2,
		},
	},
	Hasty: {
		effect: {
			dex: 2,
			con: -2,
		},
	},
	Energetic: {
		effect: {
			dex: 2,
			cha: -2,
		},
	},
	Clumsy: {
		effect: {
			dex: 2,
			wis: -2,
		},
	},

	Apathetic: {
		effect: {
			con: 2,
			dex: -2,
		},
	},
	Stubborn: {
		effect: {
			con: 2,
			wis: -2,
		},
	},
	Grumpy: {
		effect: {
			con: 2,
			cha: -2,
		},
	},
	Relaxed: {
		effect: {
			con: 2,
			str: -2,
		},
	},

	Careful: {
		effect: {
			wis: 2,
			str: -2,
		},
	},
	Curious: {
		effect: {
			wis: 2,
			con: -2,
		},
	},
	Naughty: {
		effect: {
			wis: 2,
			cha: -2,
		},
	},

	Cheerful: {
		effect: {
			cha: 2,
			str: -2,
		},
	},
	Sassy: {
		effect: {
			cha: 2,
			dex: -2,
		},
	},
	Innocent: {
		effect: {
			cha: 2,
			wis: -2,
		},
	},

	Hardy: {
		effect: {
			ac: 1,
			dex: -2,
		},
	},
	Nimble: {
		effect: {
			ac: 1,
			str: -2,
		},
	},
} as const

export const StandardNatures = Object.keys(StandardNature) as (keyof typeof StandardNature)[]
export type StandardNature = (typeof StandardNatures)[number]
