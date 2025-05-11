export type StatusDescription = {
	id: string,
	name: string,
	abbr: string,
	effect: string,
	immunity?: string,
}

const Asleep: StatusDescription = {
	id: "Asleep",
	name: "Asleep",
	abbr: "SLP",
	effect: "Incapacitated and restrained, and rolls all saving throws with disadvantage. Lasts three rounds. When subject to forced movement and at the end of each of its turns, roll a d20. On 11 or higher, the condition ends.",
}

const Burned: StatusDescription = {
	id: "Burned",
	name: "Burned",
	abbr: "BRN",
	effect: "Rolls all damage rolls twice and takes the lower result. Until cured or the creature becomes unconscious, it takes an amount of damage equal to its proficiency bonus at the end of each of its turns.",
	immunity: "Fire-type pokemon are immune to this condition.",
}

const Frozen: StatusDescription = {
	id: "Frozen",
	name: "Frozen",
	abbr: "FRZ",
	effect: "Incapacitated and restrained. Lasts 1 hour, or until the creature breaks free at the end of one of its turns with a STR save DC 10 + the proficiency of the creature that caused this condition. Ends if the creature takes fire-type damage or damage from a move that can afflict the Burned status.",
	immunity: "Ice-type pokemon are immune to this condition.",
}

const Paralysis: StatusDescription = {
	id: "Paralysis",
	name: "Paralysis",
	abbr: "PAR",
	effect: "Disadvantage on STR and DEX saving throws, and moves at half speed. At the start of its turn, roll a d4. On a 1, the creature is incapacitated and restrained until the start of its next turn. This roll comes before rolls for the Asleep or Confused conditions.",
	immunity: "Electric-type pokemon are immune to this condition.",
}

const Poisoned: StatusDescription = {
	id: "Poisoned",
	name: "Poisoned",
	abbr: "PSN",
	effect: "Disadvantage on all ability checks and attack rolls. Until cured or the creature becomes unconscious, it takes an amount of damage equal to its proficiency bonus at the end of each of its turns.",
	immunity: "Poison- and Steel-type pokemon are immune to this condition.",
}

const BadlyPoisoned: StatusDescription = {
	id: "BadlyPoisoned",
	name: "Badly Poisoned",
	abbr: "PSN",
	effect: "Disadvantage on all ability checks and attack rolls. Until cured or the creature becomes unconscious, it takes an amount of damage equal to twice its proficiency bonus at the end of each of its turns.",
	immunity: "Poison- and Steel-type pokemon are immune to this condition.",
}

const Confused: StatusDescription = {
	id: "Confused",
	name: "Confused",
	abbr: "CON",
	effect: "Cannot take reactions. Lasts three rounds. At the start of the creature's turn, roll a d8. On 1-4, the creature chooses its behavior. On 5, the creature doesn't move or take actions. On 6, the creature takes the Struggle action against itself and automatically hits. On 7, the creature takes the Struggle action against the nearest Pokemon target. On 8, the condition ends.",
}

const Confused2018: StatusDescription = {
	id: "Confused",
	name: "Confused",
	abbr: "CON",
	effect: "Cannot take reactions and speed is halved. Lasts three rounds. At the start of the creature's turn, roll a d8. When a Confused Pokémon uses an action or bonus action on its turn, it must first roll a d20. On a result of 10 or lower, the Pokémon drops concentration, hurts itself for an amount of typeless damage equal to its proficiency modifier, and the move fails. On a roll of 16 or higher, the status ends immediately.",
}

const Flinched: StatusDescription = {
	id: "Flinched",
	name: "Flinched",
	abbr: "FLN",
	effect: "Disadvantage on all attack rolls, ability checks, and saving throws until the end of its next turn. If the creature uses an action that requires a saving throw, the targets have advantage on the roll.",
}

export const NonVolatileStatus = {
	Asleep: Asleep,
	Burned: Burned,
	Frozen: Frozen,
	Paralysis: Paralysis,
	Poisoned: Poisoned,
	BadlyPoisoned: BadlyPoisoned,
} satisfies Record<string, StatusDescription>
export type NonVolatileStatus = keyof typeof NonVolatileStatus

export const VolatileStatus = {
	Confused: Confused,
	Flinched: Flinched,
} satisfies Record<string, StatusDescription>
export type VolatileStatus = keyof typeof VolatileStatus

export const NonVolatileStatus2018 = {
	Burned: Burned,
	Frozen: Frozen,
	Paralysis: Paralysis,
	Poisoned: Poisoned,
} satisfies Record<string, StatusDescription>
export const VolatileStatus2018 = {
	Asleep: Asleep,
	Confused: Confused2018,
	Flinched: Flinched,
} satisfies Record<string, StatusDescription>
