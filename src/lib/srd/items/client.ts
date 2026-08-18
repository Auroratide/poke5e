import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { ItemJson, ItemListJson } from "./schema"

export class ItemsSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<ItemListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/items.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<ItemJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/items/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
