import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { EvolutionAlreadyExistsError as DuplicateEvolutionError, EvolutionDataProviderError, type EvolutionDataProvider, type EvolutionDraft, type EvolutionWriteKeys } from "./EvolutionDataProvider"
import type { SpeciesIdentifier } from "$lib/creatures/species"
import { Evolution, type EvolutionId } from "../Evolution"
import type { Data } from "$lib/DataClass"
import { PostgresErrorCode } from "$lib/supabase"

export class SupabaseEvolutionDataProvider implements EvolutionDataProvider {
	constructor(private readonly supabase: SupabaseClient) {}

	async get(species: SpeciesIdentifier, seen: Data<SpeciesIdentifier>[] = []): Promise<Evolution[]> {
		if (!species.isFakemon()) return []
		if (seen.includes(species.data)) return []

		const { data, error } = await this.supabase.rpc("get_fakemon_evolutions", { _fakemon_id: species.data }).select<"*", EvolutionRow>()

		this.validateError("Could not get evolutions.", error)

		seen.push(species.data)

		const dedupMap = new Map<EvolutionId, Evolution>()
		for (const evo of data) {
			const convertedEvolution = rowToEvolution(evo)
			dedupMap.set(convertedEvolution.id, convertedEvolution)

			await Promise.all([
				this.get(convertedEvolution.from, seen),
				this.get(convertedEvolution.to, seen),
			]).then((result) => {
				result.flat().forEach((evo) => {
					dedupMap.set(evo.id, evo)
				})
			})
		}

		return Array.from(dedupMap.values())
	}

	async add(draft: EvolutionDraft, writeKeys: EvolutionWriteKeys): Promise<Evolution> {
		const { data, error } = await this.supabase.rpc("add_fakemon_evolution",
			this.toQuery(draft, writeKeys),
		).single<number>()

		this.validateError("Could not add evolution", error, draft)

		if (data == null) {
			throw new EvolutionDataProviderError("Could not add evolution", draft)
		}

		return new Evolution({
			...draft,
			id: data.toString(),
		})
	}

	async update(evolution: Evolution, writeKeys: EvolutionWriteKeys, oldWriteKeys: EvolutionWriteKeys): Promise<Evolution> {
		const { data, error } = await this.supabase.rpc("update_fakemon_evolution", {
			_id: evolution.data.id,
			_original_from_write_key: oldWriteKeys.from ?? null,
			_original_to_write_key: oldWriteKeys.to ?? null,
			...this.toQuery(evolution.data, writeKeys),
		}).single<number>()

		this.validateError("Could not update evolution.", error, evolution.data)
		if (data < 1) {
			throw new EvolutionDataProviderError("Could not update evolution.", evolution.data)
		}

		return evolution
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

	private validateError(message: string, e: PostgrestError | undefined, evolution?: Pick<Data<Evolution>, "from" | "to">) {
		if (e) {
			console.error(e)

			if (e.code === PostgresErrorCode.UniqueViolation) {
				throw new DuplicateEvolutionError(evolution)
			}

			throw new EvolutionDataProviderError(message, evolution)
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
