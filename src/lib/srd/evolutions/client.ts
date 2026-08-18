import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { EvolutionJson, EvolutionListJson } from "./schema"

export class EvolutionsSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<EvolutionListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/evolutions.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<EvolutionJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/evolutions/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
