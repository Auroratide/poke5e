import type { RulesInfo } from "$lib/poke5e/rules"
import { Url } from "$lib/site/url"

export const meta: RulesInfo = {
	name: "Status Conditions",
	url: Url.rules.status(),
	keywords: ["asleep", "burned", "paralyzed", "paralysis", "frozen", "poisoned", "badly", "confused", "confusion", "flinched"],
}
