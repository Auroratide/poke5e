import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { MoveJson, MovesListJson } from "./schema"

export class MovesSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<MovesListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/moves.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<MoveJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/moves/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
