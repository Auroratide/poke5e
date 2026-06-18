import type { AbilityScoreImprovement, Attributes } from "$lib/dnd/attributes"
import type { Feat } from "$lib/dnd/feats"
import type { ChosenFeat } from "$lib/dnd/feats/ChosenFeat"
import { LevelUpEffect } from "../LevelUpEffect"
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

type HasAttributesAndFeats = {
	feats: ChosenFeat[],
	attributes: Attributes,
}

export class AsiOrFeatEffect extends LevelUpEffect<AsiOrFeatProps, AsiOrFeatParams> {
	get Field() {
		return AsiOrFeatField
	}

	apply<T extends HasAttributesAndFeats>(subject: T): T {
		const feat = this.params.feat
		return {
			...subject,
			attributes: subject.attributes.improve(this.params.pointsSpent),
			feats: feat != null ? [...subject.feats, feat] : subject.feats,
		}
	}
}
