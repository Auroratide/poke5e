import type { ReferenceInfo } from "$lib/poke5e/reference"
import { Url } from "$lib/site/url"

export const meta: ReferenceInfo = {
	name: "Weather",
	url: Url.reference.weather(),
	keywords: ["weather", "harsh sunlight", "rain", "sandstorm", "hail", "snow", "fog"],
}
