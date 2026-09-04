import { derived } from "svelte/store"
import { meta as AbilitiesPage } from "./abilities/meta"
import { meta as AppendixPage } from "./appendix/meta"
import { meta as BondsPage } from "./bonds/meta"
import { meta as BreedingPage } from "./breeding/meta"
import { meta as CatchingPokemonPage } from "./catching-pokemon/meta"
import { meta as CombatPage } from "./combat/meta"
import { meta as ContestsPage } from "./contests/meta"
import { meta as CoreRulesPage } from "./core-rules/meta"
import { meta as DamageTypesPage } from "./damage-types/meta"
import { meta as EncountersPage } from "./encounters/meta"
import { meta as FaintingPage } from "./fainting-resting-and-healing/meta"
import { meta as FaqPage } from "./faq/meta"
import { meta as FeatsPage } from "./feats/meta"
import { meta as IntroductionPage } from "./introduction/meta"
import { meta as LegendaryBattlesPage } from "./legendary-battles/meta"
import { meta as NaturesPage } from "./natures/meta"
import { meta as OaksParcel } from "./oaks-parcel/meta"
import { meta as PokemonLevelingPage } from "./pokemon-leveling/meta"
import { meta as PokemonTransformationsPage } from "./pokemon-transformations/meta"
import { meta as ShinyPage } from "./shiny-pokemon/meta"
import { meta as SpecializationsPage } from "./specializations/meta"
import { meta as StatusConditionsPage } from "./status-conditions/meta"
import { meta as SupplementsPage } from "./supplements/meta"
import { meta as TerrainEffectsPage } from "./terrain-effects/meta"
import { meta as TmsPage } from "./tms/meta"
import { meta as TrainerClassPage } from "./trainer-class/meta"
import { meta as TrainerLevelingPage } from "./trainer-leveling/meta"
import { meta as TrainerOriginsPage } from "./trainer-origins/meta"
import { meta as TrainerPathsPage } from "./trainer-paths/meta"
import { meta as WeatherPage } from "./weather/meta"
import { currentEdition } from "$lib/site/edition"
import type { ReferenceInfo } from "$lib/poke5e/reference"

export const Preamble = [
	IntroductionPage,
]

const CoreRules2018 = [
	CoreRulesPage,
	TrainerClassPage,
	TrainerPathsPage,
	CatchingPokemonPage,
	FaintingPage,
	BondsPage,
	CombatPage,
	DamageTypesPage,
	PokemonLevelingPage,
	TrainerLevelingPage,
	FeatsPage,
	BreedingPage,
	StatusConditionsPage,
	EncountersPage,
	PokemonTransformationsPage,
	LegendaryBattlesPage,
]

const CoreRules2024 = [
	CoreRulesPage,
	TrainerClassPage,
	TrainerPathsPage,
	PokemonLevelingPage,
	TrainerLevelingPage,
	CombatPage,
	DamageTypesPage,
	CatchingPokemonPage,
	FaintingPage,
]

const Appendix2018 = [
	AppendixPage,
	AbilitiesPage,
	NaturesPage,
	SpecializationsPage,
	StatusConditionsPage,
	TerrainEffectsPage,
	TmsPage,
	WeatherPage,
	FaqPage,
]

const Appendix2024 = [
	AppendixPage,
	AbilitiesPage,
	FeatsPage,
	NaturesPage,
	SpecializationsPage,
	StatusConditionsPage,
	TerrainEffectsPage,
	TmsPage,
	WeatherPage,
	FaqPage,
]

const Supplements2018 = [
	SupplementsPage,
	ContestsPage,
	OaksParcel,
	ShinyPage,
	TrainerOriginsPage,
]

const Supplements2024 = [
	SupplementsPage,
	BondsPage,
	BreedingPage,
	EncountersPage,
	ContestsPage,
	LegendaryBattlesPage,
	OaksParcel,
	PokemonTransformationsPage,
	ShinyPage,
	TrainerOriginsPage,
]

export const CoreRules = derived(currentEdition, (version) =>
	version === "2018" ? CoreRules2018 : CoreRules2024,
)

export const Appendix = derived(currentEdition, (version) =>
	version === "2018" ? Appendix2018 : Appendix2024,
)

export const Supplements = derived(currentEdition, (version) =>
	version === "2018" ? Supplements2018 : Supplements2024,
)

export function search(list: ReferenceInfo[], value: string): ReferenceInfo[] {
	// always include the first item, it's the title
	const [first, ...rest] = list
	const lowerValue = value.trim().toLocaleLowerCase()
	if (lowerValue === "") return list

	const byTitle = rest.filter((it) => includesEachOther(it.name.toLocaleLowerCase(), lowerValue))
	const byKeyword = rest.filter((it) => it.keywords.some((keyword) => includesEachOther(keyword, lowerValue)))

	// prioritize title search over keyword search
	const noDuplicates = new Set([...byTitle, ...byKeyword])

	return noDuplicates.size > 0 ? [first, ...noDuplicates] : []
}

function includesEachOther(left: string, right: string) {
	return left.includes(right) || right.includes(left)
}