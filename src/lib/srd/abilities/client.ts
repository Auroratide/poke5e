import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { AbilityJson, AbilityListJson } from "./schema"

export class AbilitiesSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<AbilityListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/abilities.json", { edition: this.edition })).pathname)
			.then((res) => res.json())
	}

	one(id: string): Promise<AbilityJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/abilities/[id].json", { edition: this.edition, id })).pathname)
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
