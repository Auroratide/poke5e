import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { EvolutionDataProviderError, type EvolutionDataProvider, type EvolutionDraft, type EvolutionWriteKeys } from "./EvolutionDataProvider"
import type { SpeciesIdentifier } from "$lib/creatures/species"
import { Evolution, type EvolutionId } from "../Evolution"
import type { Data } from "$lib/DataClass"

export class SupabaseEvolutionDataProvider implements EvolutionDataProvider {
	constructor(private readonly supabase: SupabaseClient) {}

	async get(species: SpeciesIdentifier): Promise<Evolution[]> {
		return this.supabase.rpc("get_fakemon_evolutions", { _fakemon_id: species.data })
			.select<"*", EvolutionRow>()
			.then(({ data, error }) => {
				this.validateError("Could not get evolutions.", error)
				if (!data || data.length === 0) return []

				return data.map(rowToEvolution)
			})
	}

	async add(draft: EvolutionDraft, writeKeys: EvolutionWriteKeys): Promise<Evolution> {
		const { data, error } = await this.supabase.rpc("add_fakemon_evolution",
			this.toQuery(draft, writeKeys),
		).single<number>()

		this.validateError("Could not add evolution.", error)

		return new Evolution({
			...draft,
			id: data.toString(),
		})
	}

	async remove(evolution: EvolutionId, writeKeys: EvolutionWriteKeys): Promise<void> {
		const { data, error } = await this.supabase.rpc("remove_fakemon_evolution", {
			_id: evolution,
			_original_from_write_key: writeKeys.from ?? null,
			_original_to_write_key: writeKeys.to ?? null,
		}).single<number>()

		this.validateError("Could not remove evolution.", error)

		if (data < 1) {
			throw new EvolutionDataProviderError("Could not remove evolution.")
		}
	}

	private toQuery(evolution: Omit<Data<Evolution>, "id">, writeKeys: EvolutionWriteKeys): object {
		return {
			_from_id: evolution.from,
			_from_write_key: writeKeys.from ?? null,
			_to_id: evolution.to,
			_to_write_key: writeKeys.to ?? null,
			_conditions: JSON.stringify(evolution.conditions),
			_effects: JSON.stringify(evolution.effects),
		}
	}

	private validateError(message: string, e: PostgrestError | undefined) {
		if (e) {
			console.error(e)
			throw new EvolutionDataProviderError(message)
		}
	}
}

type EvolutionRow = {
	id: number,
	from_id: string,
	to_id: string,
	conditions: string,
	effects: string,
}

function rowToEvolution(row: EvolutionRow): Evolution {
	return new Evolution({
		id: row.id.toString(),
		from: row.from_id,
		to: row.to_id,
		conditions: JSON.parse(row.conditions),
		effects: JSON.parse(row.effects),
	})
}
