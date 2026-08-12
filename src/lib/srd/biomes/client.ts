import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { BiomesListJson } from "./schema"

export class BiomesSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<BiomesListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/biomes.json", { edition: this.edition })))
			.then((res) => res.json())
	}
}
