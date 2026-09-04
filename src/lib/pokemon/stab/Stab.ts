import { DataClass } from "$lib/DataClass"
import type { Level } from "$lib/dnd/level"
import type { Edition } from "$lib/srd/editions"

export type StabBase = "default" | "movepower" | "proficiency" | "ruleset18" | "none"

export class Stab extends DataClass<{
	base: StabBase,
	bonus: number,
}> {
	get base() { return this.data.base }
	get bonus() { return this.data.bonus }

	calculate(moveModifier: number, level: Level, rulesVersion: Edition): number {
		return Math.max(0, this.getBaseStab(moveModifier, level, rulesVersion) + this.bonus)
	}

	private getBaseStab(moveModifier: number, level: Level, rulesVersion: Edition): number {
		switch (this.base) {
		case "default":
			if (rulesVersion === "2018")
				return this.byRuleset18(level)
			else
				return this.byProficiency(level)
		case "movepower":
			return this.byMovepower(moveModifier)
		case "proficiency":
			return this.byProficiency(level)
		case "ruleset18":
			return this.byRuleset18(level)
		case "none":
			return this.byNone()
		default:
			if (rulesVersion === "2018")
				return this.byRuleset18(level)
			else
				return this.byMovepower(moveModifier)
		}
	}

	private byMovepower(moveModifier: number): number {
		return Math.max(moveModifier, 0)
	}

	private byProficiency(level: Level): number {
		return level.proficiencyBonus
	}

	private byRuleset18(level: Level): number {
		return Math.floor((level.data + 1) / 4)
	}

	private byNone(): number {
		return 0
	}

	static default(): Stab {
		return new Stab({ base: "default", bonus: 0 })
	}
}