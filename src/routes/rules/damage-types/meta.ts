import type { RulesInfo } from "$lib/poke5e/rules"
import { Url } from "$lib/site/url"

export const meta: RulesInfo = {
	name: "Damage Types",
	url: Url.rules.damageTypes(),
	keywords: ["damage", "type", "resistance", "vulnerability", "immunity", "bludgeoning", "slashing", "piercing", "fire", "cold", "lightning", "force", "radiant", "necrotic", "thunder", "acid", "poison", "calculator", "convert", "conversion", "magic"],
}
