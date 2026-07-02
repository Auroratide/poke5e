import { AbilityScoreImprovement, type Attributes } from "$lib/dnd/attributes"
import type { Feat, FeatEffects } from "$lib/dnd/feats"
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
	featEffects?: FeatEffects,
	pointsSpent: AbilityScoreImprovement,
}

type HasAttributesFeatsLevelHp = {
	level: Level,
	feats: ChosenFeat[],
	attributes: Attributes,
	hp: Resource,
	ac: number,
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
		// this is necessary because otherwise the feat is a funky svelte proxy object
		const feat = this.params.feat ? { ...this.params.feat } : undefined

		const originalCon = subject.attributes.con
		const improvedAttributes = subject.attributes.improve(this.params.pointsSpent)
		const differenceInConModifier = improvedAttributes.con.modifier - originalCon.modifier
		const hpGain = subject.level.data * differenceInConModifier

		if (feat != null && this.params.featEffects != null) {
			subject = this.params.featEffects?.onAcquire?.(subject) ?? subject
		}

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
