import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { TmJson, TmListJson } from "./schema"

export class TmsSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<TmListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/tms.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<TmJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/tms/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
