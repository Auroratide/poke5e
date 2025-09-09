export const StandardNature = {
	Hardy: {
		effect: {},
	},
	Lonely: {
		effect: {
			str: 1,
			con: -1,
		},
	},
	Brave: {
		effect: {
			str: 1,
			dex: -1,
		},
	},
	Adamant: {
		effect: {
			str: 1,
			wis: -1,
		},
	},
	Naughty: {
		effect: {
			str: 1,
			cha: -1,
		},
	},

	Bold: {
		effect: {
			con: 1,
			str: -1,
		},
	},
	Docile: {
		effect: {},
	},
	Relaxed: {
		effect: {
			con: 1,
			dex: -1,
		},
	},
	Impish: {
		effect: {
			con: 1,
			wis: -1,
		},
	},
	Lax: {
		effect: {
			con: 1,
			cha: -1,
		},
	},

	Timid: {
		effect: {
			dex: 1,
			str: -1,
		},
	},
	Hasty: {
		effect: {
			dex: 1,
			con: -1,
		},
	},
	Serious: {
		effect: {},
	},
	Jolly: {
		effect: {
			dex: 1,
			wis: -1,
		},
	},
	Naive: {
		effect: {
			dex: 1,
			cha: -1,
		},
	},

	Modest: {
		effect: {
			wis: 1,
			str: -1,
		},
	},
	Mild: {
		effect: {
			wis: 1,
			con: -1,
		},
	},
	Quiet: {
		effect: {
			wis: 1,
			dex: -1,
		},
	},
	Bashful: {
		effect: {},
	},
	Rash: {
		effect: {
			wis: 1,
			cha: -1,
		},
	},

	Calm: {
		effect: {
			cha: 1,
			str: -1,
		},
	},
	Gentle: {
		effect: {
			cha: 1,
			con: -1,
		},
	},
	Sassy: {
		effect: {
			cha: 1,
			dex: -1,
		},
	},
	Careful: {
		effect: {
			cha: 1,
			wis: -1,
		},
	},
	Quirky: {
		effect: {},
	},
} as const

export const StandardNatures = Object.keys(StandardNature) as (keyof typeof StandardNature)[]
export type StandardNature = (typeof StandardNatures)[number]