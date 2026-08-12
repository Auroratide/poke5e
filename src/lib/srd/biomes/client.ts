import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { BiomesListJson } from "./schema"

export class BiomesSrdClient {
	constructor(readonly edition: Edition) {}

	all(): Promise<BiomesListJson> {
		return fetch(localizeUrl(resolve("/srd/v1/[edition]/biomes.json", { edition: this.edition })))
			.then((res) => res.json())
	}
}
