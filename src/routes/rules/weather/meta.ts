import type { RulesInfo } from "$lib/poke5e/rules"
import { Url } from "$lib/site/url"

export const meta: RulesInfo = {
	name: "Weather",
	url: Url.rules.weather(),
	keywords: ["weather", "harsh sunlight", "rain", "sandstorm", "hail", "snow", "fog"],
}
