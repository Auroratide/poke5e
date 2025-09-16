import { get } from "svelte/store"
import { test, expect, vi } from "vitest"
import { provider } from "$lib/fakemon/data"
import { fakemonStore } from "../FakemonStore"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import type { ImageInputValue } from "$lib/design/forms"
import { stubImageFile } from "$lib/test/files"
import { stubPokemonSpecies } from "$lib/creatures/species/test/stubs"
import { SpeciesMedia } from "$lib/creatures/media"

test("new fakemon", async () => {
	// given: a draft fakemon
	const getFakemon = vi.spyOn(provider, "getByReadKey")

	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	// when: it is added
	const addedResult = await fakemonStore.new(draft.data.species)

	const singleStore = await fakemonStore.get(addedResult.data.readKey)
	const storedValue = get(singleStore)
	storedValue.value.data.writeKey = addedResult.data.writeKey

	// then: we did not need to fetch it explicitly
	expect(storedValue.value).toEqualData(addedResult)
	expect(getFakemon).not.toHaveBeenCalled()
})

test("store remembers", async () => {
	// given: a fakemon in the db
	const getFakemon = vi.spyOn(provider, "getByReadKey")

	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const eeveon = await provider.add(draft.data.species)

	// when: it is fetched
	const singleStore = await fakemonStore.get(eeveon.data.readKey)
	const storedValue = get(singleStore)
	storedValue.value.data.writeKey = eeveon.data.writeKey // getting does not have write key

	// then: we get it back
	expect(storedValue.value).toEqualData(eeveon)

	// when: we fetch it again
	const singleStoreAgain = await fakemonStore.get(eeveon.data.readKey)
	const storedValueAgain = get(singleStoreAgain)
	storedValueAgain.value.data.writeKey = eeveon.data.writeKey

	// then: we only fetched from the db once
	expect(storedValueAgain.value).toEqualData(eeveon)
	expect(getFakemon).toBeCalledTimes(1)
})

test("updating an entry", async () => {
	// given: fakemon had been added
	const getFakemon = vi.spyOn(provider, "getByReadKey")

	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const addedResult = await fakemonStore.new(draft.data.species)
	const singleStore = await fakemonStore.get(addedResult.data.readKey)
	const storedValue = get(singleStore)

	// when: updated
	const updatedFakemon = storedValue.value.copy({
		species: storedValue.value.species.copy({
			name: "Droideon",
		}).data,
	})
	await storedValue.update?.info(updatedFakemon, {})

	// then: new value is updated
	const singleStoreAfterUpdate = await fakemonStore.get(addedResult.data.readKey)
	const storedValueAfterUpdate = get(singleStoreAfterUpdate)

	expect(storedValueAfterUpdate.value.data.species.name).toEqual("Droideon")

	// and: never retrieved from the provider since it was added
	expect(getFakemon).not.toHaveBeenCalled()
})

test("updating with new media", async () => {
	// given: fakemon had been added
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const addedResult = await fakemonStore.new(draft.data.species)
	const singleStore = await fakemonStore.get(addedResult.data.readKey)
	const storedValue = get(singleStore)

	// when: updated
	const updatedFakemon = storedValue.value.copy({
		species: storedValue.value.species.copy({
			name: "Droideon",
		}).data,
	})
	await storedValue.update?.info(updatedFakemon, {
		media: new SpeciesMedia<ImageInputValue>({
			normalPortrait: {
				type: "new",
				value: stubImageFile("img.png"),
			},
		}),
	})

	// then: new value is updated
	const singleStoreAfterUpdate = await fakemonStore.get(addedResult.data.readKey)
	const storedValueAfterUpdate = get(singleStoreAfterUpdate)

	expect(storedValueAfterUpdate.value.species.media.data.normalPortrait.name).toBeDefined()
})

test("listing fakemon", async () => {
	// given: some fakemon in the db
	const eeveonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})
	const drakeonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Drakeon",
		}).data,
	})

	await provider.add(eeveonDraft.data.species)
	await provider.add(drakeonDraft.data.species)

	// when: we get the list
	const listStore = await fakemonStore.all()
	const listResult = get(listStore)
	const resultNames = listResult.map((it) => it.data.species.name)
	
	// then: it contains all the fakemon
	expect(resultNames).toContain("Eeveon")
	expect(resultNames).toContain("Drakeon")
})
