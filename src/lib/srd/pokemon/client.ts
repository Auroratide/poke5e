import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"
import type { Edition } from "../editions"
import type { PokemonJson, PokemonListJson } from "./schema"

export class PokemonSrdClient {
	constructor(readonly edition: Edition, private readonly customFetch = fetch) {}

	all(): Promise<PokemonListJson> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/pokemon.json", { edition: this.edition })))
			.then((res) => res.json())
	}

	one(id: string): Promise<PokemonJson | undefined> {
		return this.customFetch(localizeUrl(resolve("/srd/v1/[edition]/pokemon/[id].json", { edition: this.edition, id })))
			.then((res) => res.ok ? res.json() : Promise.resolve(undefined))
	}
}
