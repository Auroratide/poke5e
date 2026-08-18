import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { ContestEffectJson, ContestEffectListJson } from "./schema"

export class ContestEffectsSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<ContestEffectListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/contest-effects.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<ContestEffectJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/contest-effects/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
