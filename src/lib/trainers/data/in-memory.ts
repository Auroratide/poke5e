import type { Pokemon } from "$lib/creatures/types"
import type { TrainerData, TrainerDataProvider } from "."
import {
	type TrainerPokemon,
	type ReadWriteKey,
	type TrainerInfo,
	type TrainerId,
	Natures,
	type Trainer,
	type WithWriteKey,
	type LearnedMove,
} from "../types"
import { Gender } from "../types"

let POKEMON_ID = 1
const nextPokemonId = () => (++POKEMON_ID).toString()

let MOVE_ID = 1
const nextMoveId = () => (++MOVE_ID).toString()

const randomKey = (length: number): ReadWriteKey => {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let key = ""
	for (let i = 0; i < length; ++i) {
		key += alphabet[Math.floor(Math.random() * alphabet.length)]
	}

	return key
}

const DEFAULT_INITIAL_ENTRIES: TrainerData[] = [ {
	writeKey: "QM9M65DPLEBV218UKFNG",
	info: {
		id: "e2439894-8b10-4081-812c-0f16a773e959",
		readKey: "YLFN6S3NGOPA",
		name: "Renibel",
		description: "A trainer that likes ghosts and urban legends.",
		level: 10,
		ac: 11,
		hp: {
			current: 50,
			max: 50,
		},
		hitDice: {
			current: 10,
			max: 10,
		},
		attributes: {
			str: 9,
			dex: 11,
			con: 10,
			int: 17,
			wis: 12,
			cha: 15,
		},
		savingThrows: ["cha"],
		proficiencies: ["animal handling", "history", "deception"],
	},
	pokemon: [ {
		id: nextPokemonId(),
		trainerId: "e2439894-8b10-4081-812c-0f16a773e959",
		pokemonId: "mimikyu",
		nickname: "Pikachu",
		nature: "cheerful",
		type: ["ghost", "fairy"],
		level: 11,
		gender: Gender.Male,
		attributes: {
			str: 10,
			dex: 14,
			con: 16,
			int: 6,
			wis: 18,
			cha: 13,
		},
		ac: 17,
		hp: {
			current: 44,
			max: 97,
		},
		hitDice: {
			current: 11,
			max: 11,
		},
		ability: "disguise",
		proficiencies: ["arcana", "intimidation", "performance"],
		savingThrows: ["wis", "cha"],
		moves: [ {
			id: nextMoveId(),
			moveId: "mimic",
			pp: {
				current: 5,
				max: 5,
			},
			notes: "2d8 + 10 ghost",
		}, {
			id: nextMoveId(),
			moveId: "astonish",
			pp: {
				current: 10,
				max: 10,
			},
		}, {
			id: nextMoveId(),
			moveId: "copycat",
			pp: {
				current: 10,
				max: 10,
			},
		}, {
			id: nextMoveId(),
			moveId: "protect",
			pp: {
				current: 3,
				max: 3,
			},
		}, {
			id: nextMoveId(),
			moveId: "charm",
			pp: {
				current: 10,
				max: 10,
			},
		} ],
		notes: "Not vulnerable to ghost-type moves.",
		teraType: "fairy",
		status: null,
		isShiny: false,
	}, {
		id: nextPokemonId(),
		trainerId: "e2439894-8b10-4081-812c-0f16a773e959",
		pokemonId: "kirlia",
		nickname: "Curly",
		type: ["psychic", "fairy"],
		nature: "curious",
		level: 6,
		gender: Gender.Female,
		attributes: {
			str: 10,
			dex: 14,
			con: 8,
			int: 10,
			wis: 16,
			cha: 12,
		},
		ac: 12,
		hp: {
			current: 44,
			max: 44,
		},
		hitDice: {
			current: 6,
			max: 6,
		},
		ability: "telepathy",
		proficiencies: ["insight", "perception"],
		savingThrows: ["wis"],
		moves: [ {
			id: nextMoveId(),
			moveId: "psychic",
			pp: {
				current: 5,
				max: 5,
			},
		}, {
			id: nextMoveId(),
			moveId: "teleport",
			pp: {
				current: 10,
				max: 10,
			},
		}, {
			id: nextMoveId(),
			moveId: "heal-pulse",
			pp: {
				current: 5,
				max: 5,
			},
		}, {
			id: nextMoveId(),
			moveId: "magical-leaf",
			pp: {
				current: 5,
				max: 5,
			},
		} ],
		notes: "",
		teraType: "ghost",
		status: null,
		isShiny: false,
	}, {
		id: nextPokemonId(),
		trainerId: "e2439894-8b10-4081-812c-0f16a773e959",
		pokemonId: "litwick",
		nickname: "Torchee",
		type: ["ghost", "fire"],
		nature: "apathetic",
		level: 6,
		gender: Gender.Male,
		attributes: {
			str: 12,
			dex: 7,
			con: 15,
			int: 6,
			wis: 13,
			cha: 10,
		},
		ac: 13,
		hp: {
			current: 47,
			max: 47,
		},
		hitDice: {
			current: 6,
			max: 6,
		},
		ability: "flame-body",
		proficiencies: ["arcana"],
		savingThrows: ["wis"],
		moves: [ {
			id: nextMoveId(),
			moveId: "hex",
			pp: {
				current: 5,
				max: 5,
			},
		}, {
			id: nextMoveId(),
			moveId: "smog",
			pp: {
				current: 5,
				max: 5,
			},
		}, {
			id: nextMoveId(),
			moveId: "will-o-wisp",
			pp: {
				current: 10,
				max: 10,
			},
		}, {
			id: nextMoveId(),
			moveId: "flame-burst",
			pp: {
				current: 10,
				max: 10,
			},
		} ],
		notes: "",
		teraType: "fire",
		status: null,
		isShiny: false,
	} ],
}, {
	writeKey: "0DHGNM55DGSU9MLA1J7D",
	info: {
		id: "f87e5b9a-d011-4194-983d-95c0c8db84fc",
		readKey: "7JD88HNDIURS",
		name: "Iris",
		description: "A trainer that likes colors and flowers.",
		level: 10,
		ac: 14,
		hp: {
			current: 50,
			max: 50,
		},
		hitDice: {
			current: 10,
			max: 10,
		},
		attributes: {
			str: 12,
			dex: 16,
			con: 10,
			int: 17,
			wis: 8,
			cha: 13,
		},
		savingThrows: ["dex", "int"],
		proficiencies: ["stealth", "animal handling", "persuasion", "deception"],
	},
	pokemon: [],
} ]

export class InMemoryTrainerProvider implements TrainerDataProvider {
	constructor(private entries: TrainerData[] = DEFAULT_INITIAL_ENTRIES) {}

	allTrainers = async (): Promise<Trainer[]> => {
		return this.entries.map((it) => it.info)
	}

	getTrainer = async (readKey: ReadWriteKey): Promise<TrainerData | undefined> => {
		return this.entries.find((it) => it.info.readKey === readKey)
	}

	newTrainer = async (info: Pick<TrainerInfo, "name" | "description">): Promise<TrainerData & WithWriteKey> => {
		const id = nextPokemonId()
		const readKey = randomKey(12)
		const writeKey = randomKey(20)

		return {
			info: {
				...info,
				level: 1,
				ac: 10,
				hp: {
					current: 8,
					max: 8,
				},
				hitDice: {
					current: 1,
					max: 1,
				},
				attributes: {
					str: 10,
					dex: 10,
					con: 10,
					int: 10,
					wis: 10,
					cha: 10,
				},
				proficiencies: ["animal handling"],
				savingThrows: ["cha"],
				id,
				readKey,
			},
			pokemon: [],
			writeKey,
		}
	}

	removeTrainer = async (id: string): Promise<void> => {
		this.entries = this.entries.filter((it) => it.info.id !== id)
	}

	deleteTrainer = async (writeKey: ReadWriteKey, id: TrainerId): Promise<boolean> => {
		if (!writeKey) return false

		this.entries = this.entries.filter((it) => it.info.id !== id)

		return true
	}

	updateTrainerInfo = async (writeKey: ReadWriteKey, info: TrainerInfo): Promise<boolean> => {
		if (!writeKey) return false
        
		const trainer = this.entries.find((it) => it.writeKey === writeKey)
		if (trainer) {
			trainer.info = {
				...trainer.info,
				...info,
			}

			return true
		} else {
			return false
		}
	}

	updatePokemon = async (writeKey: ReadWriteKey, info: TrainerPokemon): Promise<boolean> => {
		if (!writeKey) return false
        
		const trainer = this.entries.find((it) => it.writeKey === writeKey)
		const pokemonIndex = trainer?.pokemon.findIndex((it) => it.id === info.id)
		if (pokemonIndex >= 0) {
			trainer.pokemon[pokemonIndex] = {
				...trainer.pokemon[pokemonIndex],
				...info,
			}

			return true
		} else {
			return false
		}
	}

	addPokemonToTeam = async (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon): Promise<TrainerPokemon> => {
		if (!writeKey) throw new Error("Invalid write key")
        
		const trainer = this.entries.find((it) => it.writeKey === writeKey)
		if (trainer) {
			const newPokemon: TrainerPokemon = {
				id: nextPokemonId(),
				trainerId: trainerId,
				pokemonId: pokemon.id,
				nickname: pokemon.name,
				type: ["normal"], // wrong, but the type info is in a database apparently
				nature: Natures[0],
				level: pokemon.minLevel,
				gender: Gender.None,
				attributes: pokemon.attributes,
				ac: pokemon.ac,
				ability: pokemon.abilities[0]?.id,
				hp: {
					current: pokemon.hp,
					max: pokemon.hp,
				},
				hitDice: {
					current: pokemon.minLevel,
					max: pokemon.minLevel,
				},
				proficiencies: pokemon.skills,
				savingThrows: pokemon.savingThrows,
				moves: [],
				notes: "",
				teraType: "normal",
				status: null,
				isShiny: false,
			}

			trainer.pokemon.push(newPokemon)

			return newPokemon
		} else {
			throw new Error("Invalid write key")
		}
	}

	removePokemon = async (writeKey: string, id: string): Promise<boolean> => {
		const trainer = this.entries.find((it) => it.writeKey === writeKey)
		if (trainer) {
			trainer.pokemon = trainer.pokemon.filter((it) => it.id !== id)
			return true
		}

		return false
	}

	updateMoveset = async (writeKey: string, pokemonId: string, moves: LearnedMove[]): Promise<LearnedMove[]> => {
		if (!writeKey) throw new Error("Invalid write key")

		const pokemon = this.entries
			.flatMap((it) => it.pokemon)
			.find((pokemon) => pokemon.id === pokemonId)

		pokemon.moves = moves

		return moves
	}

	updateOneMove = async (writeKey: string, move: LearnedMove): Promise<boolean> => {
		if (!writeKey) return false

		const pokemonWithMove = this.entries
			.flatMap((it) => it.pokemon)
			.find((pokemon) =>
				pokemon.moves.map((move) => move.id).includes(move.id),
			)

		const moveIndex = pokemonWithMove?.moves.findIndex((it) => it.id === move.id)
		if (moveIndex >= 0) {
			pokemonWithMove.moves[moveIndex] = move

			return true
		} else {
			return false
		}
	}

	verifyWriteKey = async (trainer: Trainer, writeKey: ReadWriteKey): Promise<boolean> => {
		const found = this.entries.find((it) => it.info.id === trainer.id)

		return found?.writeKey === writeKey
	}
}
