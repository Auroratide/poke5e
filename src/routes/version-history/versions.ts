export type VersionHistory = {
	versions: {
		name: `v${number}.${number}.${number}`,
		description: string[],
	}[],
	groups: {
		name: `v${number}.${number}`,
		highlight: string,
		description: string,
	}[]
}

export const versionHistory: VersionHistory = {
	versions: [ {
		name: "v1.8.2",
		description: [
			"Fakémon: Include a BST-to-Stat converter.",
			"Fakémon: Add general notes field.",
			"Fakémon: Add onboarding screen when you do not have any fakémon.",
			"Bug fix: Correct damage type of Flip Turn.",
		],
	}, {
		name: "v1.8.1",
		description: [
			"New: Fakémon artwork can be given attribution to their artists.",
			"Reference: Add Hidden Ability feat back to 2024 rules.",
			"Bug fix: Can now see bond levels on pokémon that do not have a picture.",
			"Bug fix: Fix sizes of Runerigus and Houndstone.",
		],
	}, {
		name: "v1.8.0",
		description: [
			"New: Custom Pokémon (aka Fakémon) navigator and editor.",
			"New: Fakémon can be added to trainer teams like regular Pokémon.",
			"Typo fix: Laser Focus",
		],
	}, {
		name: "v1.7.11",
		description: [
			"Bug fix: Correct Mimikyu's TM list.",
		],
	}, {
		name: "v1.7.10",
		description: [
			"Bug fix: Correct Ogerpon (Cornerstone) ability.",
			"Charizard TM list update: 28, 29 → 38, 39",
		],
	}, {
		name: "v1.7.9",
		description: [
			"Bug fix: Allow 2018 natures to be selectable for pokemon.",
			"Bug fix: Reduced visual clutter when defining a custom nature.",
			"Typo fix: Cheerful 2018 nature now shows corrected attribute modifications.",
		],
	}, {
		name: "v1.7.8",
		description: [
			"New: Can upload custom images of your pokemon.",
			"Bug fix: Fix Super Rod item descriotion.",
			"Bug fix: Fix Mystical Fire contest effect.",
			"Bug fix: Exeggcute can properly evolve to Alolan Exeggutor.",
			"Bug fix: Removed bad TM ids from several pokémons' move lists.",
			"Typo fixes: Decorate move and Spicy Extract move.",
			"Clarify Supersweet Syrup ability.",
		],
	}, {
		name: "v1.7.7",
		description: [
			"Show which abilities on a Pokémon are hidden.",
		],
	}, {
		name: "v1.7.6",
		description: [
			"Bug fix: Bispharp should have 3 evolutionary stages.",
			"Bug fix: Corrected some egg groups (e.g. water-1 to water 1)",
			"Reference: Added missing ditto, undiscovered group, and gendered species breeding rules.",
			"Reference: Added comprehensive glossary of egg groups and the pokémon in them.",
		],
	}, {
		name: "v1.7.5",
		description: [
			"Clarify range of Magnetic Flux.",
			"Update Arceus's abilities to match the original PHB.",
			"Add Epic Boons reference page in the D&D PHB.",
		],
	}, {
		name: "v1.7.4",
		description: [
			"Bug fix: Minior learns Solar Beam (TM 22) as a TM, not Dragon Claw (TM 2).",
			"Bug fix: Zygarde learns Thousand Arrows, Thousand Waves, and Core Enforcer.",
			"Visual update on fractional SR (1/2 becomes ½).",
		],
	}, {
		name: "v1.7.3",
		description: [
			"Alphabetize types list.",
			"Clarify whom a kind of rest benefits when resting trainers or pokémon.",
		],
	}, {
		name: "v1.7.2",
		description: [
			"New: Can perform a Long Rest, Short Rest, and Pokécenter rest for trainers and their pokémon.",
			"Improved type tags with colors and icons.",
			"Improved gender ratio bar on Pokémon cards.",
		],
	}, {
		name: "v1.7.1",
		description: [
			"Bug fix: Fix Flower Trick crashing trainer page",
		],
	}, {
		name: "v1.7.0",
		description: [
			"New: Can customize pokémon size, hit dice, movement, and senses (\"Advanced\" options in the editor).",
			"New: Can manage Pokémons' experience points.",
			"New: Can manage Pokémons' bond level and points.",
			"New: Can assign expertise to skills.",
			"Bug fix: Fixed Chesnaught size.",
			"Reference: Match evolution rules of the 2018 rules to the PHB.",
			"Adjusted the level requirements for some of the Hisuian Pokémon.",
		],
	}, {
		name: "v1.6.8",
		description: [
			"Match item prices to those found in the original Player Handbook.",
			"Add missing trainer gear and Pokémon-specific held items.",
		],
	}, {
		name: "v1.6.7",
		description: [
			"Bug fix: Added missing moves to Toxtricity, Espathra, Hydrapple, and Raging Bolt.",
		],
	}, {
		name: "v1.6.6",
		description: [
			"Bug fix: Fixed evolution options for Gloom and Clamperl.",
		],
	}, {
		name: "v1.6.5",
		description: [
			"Bug fix: Removed undefined moves on Scyther and Tangela.",
		],
	}, {
		name: "v1.6.4",
		description: [
			"Can view range, time, and duration of moves that your Pokémon have learned.",
			"On move pages, can view a list of what Pokémon can learn those moves.",
			"Bug fix: Trainer path resource should not appear editable when trainer is read-only.",
		],
	}, {
		name: "v1.6.3",
		description: [
			"New: Can manage feats on trainers and Pokémon.",
		],
	}, {
		name: "v1.6.2",
		description: [
			"Bug fix: No longer persists specializations or trainer path if editing is cancelled.",
		],
	}, {
		name: "v1.6.1",
		description: [
			"References: Fixed typos.",
			"Bug fix: Show correct hit dice on trainer profile page.",
		],
	}, {
		name: "v1.6.0",
		description: [
			"New: Can specify trainer specializations.",
			"New: Can specify trainer path, or create a custom path.",
			"New: Can manage trainer path resources, such as Battle Dice or Shadow Points.",
			"Show all save and skill modifiers rather than just the proficient ones.",
		],
	}, {
		name: "v1.5.5",
		description: [
			"Bug fix: Remove extra info on the Night Shade move",
		],
	}, {
		name: "v1.5.4",
		description: [
			"Better layout for mobile landscape mode.",
			"References: Added Shiny Pokémon.",
			"In trainer pokémon editor, moves are now separated by whether the pokémon can learn them at their current level.",
		],
	}, {
		name: "v1.5.3",
		description: [
			"Bug Fix: Move to-hit, DC, and damage now calculated appropriately when adding a new Pokémon to the team",
		],
	}, {
		name: "v1.5.2",
		description: [
			"Moves: Added Ice Spinner for Cetitan.",
			"References: Added Terrain Effects",
		],
	}, {
		name: "v1.5.1",
		description: [
			"References: Fixed typos.",
		],
	}, {
		name: "v1.5.0",
		description: [
			"New: Added toggle in References section for toggling between the original \"2018\" rules and the updated \"2024\" rules.",
			"References: All original rules have been reprinted under the \"2018\" toggle.",
			"References: Added Introduction.",
			"References: Added Legendary/Boss Battles.",
			"Items: Added Capture Styler.",
		],
	}, {
		name: "v1.4.7",
		description: [
			"References: Include page for leveling up trainers.",
			"Items: Added Pokédex",
		],
	}, {
		name: "v1.4.6",
		description: [
			"References: Include note that Pokemon gain HP when levelling up.",
		],
	}, {
		name: "v1.4.5",
		description: [
			"Bug fix: Fix Shaymin Sky's ability",
			"Bug fix: Fix sprites for the different Oricorio forms",
			"Bug fix: Fix Pumpkaboo's and Gourgeist's evolution descriptions",
			"Bug fix: Urshifu Rapid Strike should have Surging Strikes",
			"Bug fix: Galarian Slowking requires a Galarica Wreath to evolve",
			"Bug fix: Galarian Zen Mode changes stats that are more faithful to Pokémon lore",
			"Bug fix: Calyrex Rider forms have their signature moves now",
			"Reference: Update ASI bonus for leveling Pokémon",
			"Items: Added Leek, DNA Splicer, and Galarica Wreath",
		],
	}, {
		name: "v1.4.4",
		description: [
			"Bug fix: Use correct Perrserker abilities.",
		],
	}, {
		name: "v1.4.3",
		description: [
			"Added trainer gear to items, including the trainer's license, key stone, z-ring, dynamax band, tera orb, and modern adventuring equipment.",
		],
	}, {
		name: "v1.4.2",
		description: [
			"Added Pokémon: Origin Forme Dialga and Palkia, Bloodmoon Ursaluna",
		],
	}, {
		name: "v1.4.1",
		description: [
			"Display move name for TMs Pokémon can learn",
			"Better messaging if scripting is disabled",
		],
	}, {
		name: "v1.4.0",
		description: [
			"Added an Accessibility Statement and Privacy Policy.",
			"Added Github and Discord links to footer.",
			"General forms overhaul, improving the spacing of the UI for better browser and mobile compatibility.",
			"Multiple accessibility enhancements (skip links, headings, focus management).",
			"Bug fix: Poliwhirl can evolve into Politoed.",
		],
	}, {
		name: "v1.3.4",
		description: [
			"Bug fix: When Pokémon evolve, their type now evolves as well.",
		],
	}, {
		name: "v1.3.3",
		description: [
			"Added Pokémon: Walking Wake, Iron Leaves, Hydrapple line, Sinistcha line, the Loyal Three, Ogerpon, Gouging Fire, Raging Bolt, Iron Boulder, Iron Crown, Terapagos, Pecharunt",
		],
	}, {
		name: "v1.3.2",
		description: [
			"Bug fix: Sunny Castform uses correct sprite",
		],
	}, {
		name: "v1.3.1",
		description: [
			"Added Pokémon: Galarian Articuno, Galarian Zapdos, Galarian Moltres",
			"Added reference: Breeding",
		],
	}, {
		name: "v1.3.0",
		description: [
			"New: Items section, documenting different items made for the 5e ruleset",
			"New: Inventory and Held Item management in the Trainer editor",
			"Bug fix: Pokémon with no skill or saving throw proficiencies now get properly added to trainer rosters",
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
		name: "v1.8",
		highlight: "Custom Pokémon!",
		description: "You can now create custom Pokémon (aka, \"Fakémon\")! Fakémon can have customized move pools, list of abilities, stat blocks, artwork, and more. They can be shared with friends via their IDs and added as part of trainer teams.",
	}, {
		name: "v1.7",
		highlight: "More Pokémon Customization!",
		description: "Pokémon have more Advanced options in the editor, allowing you to specify custom size, hit die, movement, and senses. Additionally, experience and bond can be managed, as well as expertise for skill proficiencies.",
	}, {
		name: "v1.6",
		highlight: "Trainer Paths & Specializations!",
		description: "Trainers can now specify type specializations, chosen path, and feats. Type bonuses are applied to the corresponding Pokémon, and path resources (such as Shadow Points) can be managed.",
	}, {
		name: "v1.5",
		highlight: "Original vs Updated Rules Toggle!",
		description: "Adds all of the original rules from the Pokémon 5e handbook, under a toggle that switches between the original rules and updated rules.",
	}, {
		name: "v1.4",
		highlight: "General editor enhancements!",
		description: "Overhauls the trainer editor for better browser and mobile compatibility, and enhances the overall accessibility of the app.",
	}, {
		name: "v1.3",
		highlight: "Added items!",
		description: "Adds items reference and the ability to manage items for both trainers and their Pokémon.",
	}, {
		name: "v1.2",
		highlight: "Added trainer biographies!",
		description: "Adds ability to edit trainers' biographical information and avatar.",
	}, {
		name: "v1.1",
		highlight: "Added references!",
		description: "Adds reference material for general rules of Pokemon 5e and all standard Paldean Pokémon.",
	}, {
		name: "v1.0",
		highlight: "Initial release!",
		description: "Initial version of the app. Includes reference material for pokemon, moves, and TMs, as well as the ability to manage trainers and pokemon to a basic level.",
	} ],
}

export const currentVersion = versionHistory.versions[0].name
export const currentHighlight = versionHistory.groups[0].highlight

export const getVersionsForGroup = (group: VersionHistory["groups"][number]): VersionHistory["versions"] =>
	versionHistory.versions.filter((it) => it.name.startsWith(group.name))
