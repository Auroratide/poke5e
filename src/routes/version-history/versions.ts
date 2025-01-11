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
		name: "v1.0",
		description: "Initial version of the app. Includes reference material for pokemon, moves, and TMs, as well as the ability to manage trainers and pokemon to a basic level.",
	} ],
}

export const currentVersion = versionHistory.versions[0].name

export const getVersionsForGroup = (group: VersionHistory["groups"][number]): VersionHistory["versions"] =>
	versionHistory.versions.filter((it) => it.name.startsWith(group.name))
