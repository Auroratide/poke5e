export type VersionHistory = {
	versions: {
		name: `v${number}.${number}.${number}`,
		description: string[],
	}[],
	groups: {
		name: `v${number}.${number}`,
		description: string,
	}[]
}

export const versionHistory: VersionHistory = {
	versions: [ {
		name: "v1.3.0",
		description: [
			"New: Items section, documenting different items made for the 5e ruleset",
			"New: Inventory and Held Item management in the Trainer editor",
			"Bug fix: Pokémon with no skill or saving throw proficiencies now get properly added to trainer rosters"
		],
	}, {
		name: "v1.2.5",
		description: [
			"Added references: Abilities",
			"New: Can give any pokémon any ability in the editor for full flexibility",
		],
	}, {
		name: "v1.2.4",
		description: [
			"Bug fix: References on mobile is now scrollable.",
		],
	}, {
		name: "v1.2.3",
		description: [
			"Added Pokémon: Great Tusk, Scream Tail, Brute Bonnet, Flutter Mane, Slither Wing, Sandy Shocks, Iron Treads, Iron Bundle, Iron Hands, Iron Jugulis, Iron Moth, Iron Thorns, Baxcalibur line, Gholdengo line, Wo-Chien, Chien-Pao, Ting-Lu, Chi-Yu, Roaring Moon, Iron Valiant, Koraidon, Miraidon",
			"New: When choosing Pokemon moves, moves the Pokémon can learn naturally are at the top of the list.",
		],
	}, {
		name: "v1.2.2",
		description: [
			"Added references: Catching Pokémon, Bonds, Fainting and Healing, Weather, Combat, and Feats",
		],
	}, {
		name: "v1.2.1",
		description: [
			"Bug fix: Better fit non-square trainer avatar images",
		],
	}, {
		name: "v1.2.0",
		description: [
			"New: Can upload an image of a trainer.",
			"New: Can edit a trainer's species, gender, age, home region, and background.",
			"Nature list for trainer Pokémon now includes all 25 standard natures.",
		],
	}, {
		name: "v1.1.9",
		description: [
			"Added Pokemon: Cyclizar, Orthworm, Glimmora line, Houndstone line, Flamigo, Cetitan line, Veluza, Dondozo, Tatsugiri, Clodsire line, Farigiraf, Kingambit, Paldean Tauros",
		],
	}, {
		name: "v1.1.8",
		description: [
			"Added Pokemon: Wugtrio line, Bombirdier, Palafin line, Revavroom line",
		],
	}, {
		name: "v1.1.7",
		description: [
			"Added Pokemon: Armarouge and Ceruledge line, Bellibolt line, Kilowattrel line, Mabosstif line, Grafaiai line, Brambleghast line, Toedscruel line, Klawf, Scovillain line, Rabsca line, Espathra line, Tinkaton line",
		],
	}, {
		name: "v1.1.6",
		description: [
			"Added Pokemon: Lokix line, Pawmot line, Maushold line, Dachsbun line, Arboliva line, Squawkabilly, Garganacl line",
		],
	}, {
		name: "v1.1.5",
		description: [
			"Bug fix: Trainers cannot (yet) be inflicted with status effects",
		],
	}, {
		name: "v1.1.4",
		description: [
			"Added Pokemon: Skeledirge line, Quaquaval line, Oinkologne line, Spidops line",
			"Added References: Damage Types, Natures",
			"Improved gender ratio display",
		],
	}, {
		name: "v1.1.3",
		description: [
			"Can make trainer pokémon shiny",
		],
	}, {
		name: "v1.1.2",
		description: [
			"Bug fix: Riolu evolves into Lucario",
		],
	}, {
		name: "v1.1.1",
		description: [
			"Bug fix: Maintain list position when pokemon, move, or TM is selected",
		],
	}, {
		name: "v1.1.0",
		description: [
			"New References section, for Pokemon 5e rules",
			"Overhauled top menu bar",
			"Trainer pokemon can specify non-volatile conditions that afflict them",
		],
	}, {
		name: "v1.0.5",
		description: [
			"Added Hisuian Pokemon and moves they learn on level up",
			"Reduce size of pokemon download file by 25%",
		],
	}, {
		name: "v1.0.4",
		description: [
			"Added Pokemon: Zacian, Zamazenta, Eternatus, Urshifu line, Zarude, Regieleki, Regidrago, Glastrier, Spectrier, Calyrex",
			"Added Moves: Behemoth Bash, Behemoth Blade, Dragon Energy, Dynamax Cannon, Eternabeam, Jungle Healing, Surging Strikes, Thunder Cage, Wicked Blow",
		],
	}, {
		name: "v1.0.3",
		description: [
			"Added Pokemon: Frosmoth line, Stonjourner, Eiscue, Indeedee, Morpeko, Copperajah line, Dracozolt, Arctozolt, Dracovish, Arctovish, Dragapult line, Archaludon line",
			"Added Moves: Aura Wheel, Bolt Beak, Breaking Swipe, Dragon Darts, Electro Shot, Fishious Rend, Snowscape",
		],
	}, {
		name: "v1.0.2",
		description: [
			"Added Pokemon: Polteageist line, Hatterene line, Grimmsnarl line",
			"Added Moves: Tea Time, Life Dew, Magic Powder, False Surrender, Spirit Break",
		],
	}, {
		name: "v1.0.1",
		description: [
			"Bug fix: Custom natures now appear in pokemon editor",
			"Bug fix: HP fields better respect size of the number",
		],
	}, {
		name: "v1.0.0",
		description: [
			"Pokemon reference, including basic stats, movesets, and evolutionary lines.",
			"Move reference, including description and contest stats.",
			"TM reference, including list of pokemon that can learn them.",
			"Trainer app, with the ability to create a team of pokemon and manage their current stats.",
		],
	} ],
	groups: [ {
		name: "v1.3",
		description: "Adds items reference and the ability to manage items for both trainers and their Pokémon.",
	}, {
		name: "v1.2",
		description: "Adds ability to edit trainers' biographical information and avatar.",
	}, {
		name: "v1.1",
		description: "Adds reference material for general rules of Pokemon 5e and all standard Paldean Pokémon.",
	}, {
		name: "v1.0",
		description: "Initial version of the app. Includes reference material for pokemon, moves, and TMs, as well as the ability to manage trainers and pokemon to a basic level.",
	} ],
}

export const currentVersion = versionHistory.versions[0].name

export const getVersionsForGroup = (group: VersionHistory["groups"][number]): VersionHistory["versions"] =>
	versionHistory.versions.filter((it) => it.name.startsWith(group.name))
