import { AbilityScoreImprovement, type Attributes } from "$lib/dnd/attributes"
import type { Feat } from "$lib/dnd/feats"
import type { ChosenFeat } from "$lib/dnd/feats/ChosenFeat"
import type { Level } from "$lib/dnd/level"
import type { Resource } from "$lib/poke5e/resource"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import AsiOrFeatField from "./AsiOrFeatField.svelte"

export type AsiOrFeatProps = {
	options: Feat[],
	pointsToSpend: number,
	attributes: Attributes,
}

export type AsiOrFeatParams = {
	feat: ChosenFeat | undefined,
	pointsSpent: AbilityScoreImprovement,
}

type HasAttributesFeatsLevelHp = {
	level: Level,
	feats: ChosenFeat[],
	attributes: Attributes,
	hp: Resource,
}

export class AsiOrFeatEffect extends LevelUpEffect<AsiOrFeatProps, AsiOrFeatParams> {
	get Field() {
		return AsiOrFeatField
	}

	hasError(): string | undefined {
		if (this.params.feat == null && AbilityScoreImprovement.totalPoints(this.params.pointsSpent) < this.props.pointsToSpend) {
			return "Must allocate ability score improvement points."
		}

		return undefined
	}

	apply<T extends HasAttributesFeatsLevelHp>(subject: T): T {
		const feat = this.params.feat

		const originalCon = subject.attributes.con
		const improvedAttributes = subject.attributes.improve(this.params.pointsSpent)
		const differenceInConModifier = improvedAttributes.con.modifier - originalCon.modifier
		const hpGain = subject.level.data * differenceInConModifier

		return {
			...subject,
			attributes: improvedAttributes,
			feats: feat != null ? [...subject.feats, feat] : subject.feats,
			hp: {
				current: subject.hp.current + hpGain,
				max: subject.hp.max + hpGain,
			},
		}
	}
}
