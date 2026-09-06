import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { ContestJson, ContestListJson } from "./schema"

export class ContestSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<ContestListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/contest.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<ContestJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/contest/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
