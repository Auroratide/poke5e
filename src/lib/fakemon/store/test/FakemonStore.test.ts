import { get } from "svelte/store"
import { test, expect, vi, beforeEach } from "vitest"
import { provider } from "$lib/fakemon/data"
import { provider as evoProvider } from "$lib/pokemon/evolution/data"
import { createStore, type FakemonStore } from "../FakemonStore"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import type { ImageInputValue } from "$lib/ui/forms"
import { stubImageFile } from "$lib/test/files"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { SpeciesMedia } from "$lib/poke5e/species/media"
import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
import { stubEvolution } from "$lib/pokemon/evolution/test/stubs"
import { waitForStore } from "$lib/test/store"
import { TagList, TagsLocalStorage } from "$lib/poke5e/tags"

let fakemonStore: FakemonStore

beforeEach(() => {
	fakemonStore = createStore()
	fakemonStore.reset()
})

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

test("fakemon has evolutions", async () => {
	// given: a fakemon in the db
	const stageOneDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "StageOne",
		}).data,
	})

	const stageTwoDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "StageTwo",
		}).data,
	})

	const stageOne = await provider.add(stageOneDraft.data.species)
	const stageTwo = await provider.add(stageTwoDraft.data.species)

	// and: we've never fetched these fakemon before
	FakemonLocalStorage.remove(stageOne.data.readKey)
	FakemonLocalStorage.remove(stageTwo.data.readKey)

	// and: they have an evolution between them
	const evoDraft = stubEvolution({
		from: stageOne.species.id.data,
		to: stageTwo.species.id.data,
	})
	await evoProvider.add(evoDraft.data, {
		from: stageOne.data.writeKey,
		to: stageTwo.data.writeKey,
	})

	// when: it is fetched
	const singleStore = await fakemonStore.get(stageOne.data.readKey)
	const storedValue = get(singleStore)
	storedValue.value.data.writeKey = stageOne.data.writeKey // getting does not have write key

	// then: we get it back
	expect(storedValue.value).toEqualData(stageOne)

	// and: we get the evolution too
	const allStore = await fakemonStore.all()
	const allValue = await waitForStore(allStore, (value) => value.length >= 2)

	const allIds = allValue.map((it) => it.species.id.data)
	expect(allIds).toContain(stageOne.species.id.data)
	expect(allIds).toContain(stageTwo.species.id.data)
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

test.skip("updating with new media", async () => {
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
			values: {
				normalPortrait: {
					type: "new",
					value: stubImageFile("img.png"),
					href: "",
				},
			},
		}),
	})

	// then: new value is updated
	const singleStoreAfterUpdate = await fakemonStore.get(addedResult.data.readKey)
	const storedValueAfterUpdate = get(singleStoreAfterUpdate)

	// O.O
	expect(storedValueAfterUpdate.value.species.media.data.values.normalPortrait?.name).toBeDefined()
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
	const aereonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Aereon",
		}).data,
	})

	await provider.add(eeveonDraft.data.species)
	await provider.add(drakeonDraft.data.species)
	await provider.add(aereonDraft.data.species)

	// when: we get the list
	const listStore = await fakemonStore.all()
	const listResult = await waitForStore(listStore, (value) => value.length >= 3)
	const resultNames = listResult.map((it) => it.data.species.name)
	
	// then: it contains all the fakemon, in alpha order
	expect(resultNames).toEqual(["Aereon", "Drakeon", "Eeveon"])
})

test("verifying access", async () => {
	// given: a fakemon in the db
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const eeveon = await provider.add(draft.data.species)
	FakemonLocalStorage.remove(eeveon.data.readKey) // remove the write key

	// when: access is verified
	const singleStore = await fakemonStore.get(eeveon.data.readKey)
	const noMatch = await singleStore.verifyAccess("bad")
	expect(noMatch).toBe(false)

	const match = await singleStore.verifyAccess(eeveon.data.writeKey)
	expect(match).toBe(true)

	// then: write key is saved
	const storedValue = get(singleStore)
	expect(storedValue.value.data.writeKey).toEqual(eeveon.data.writeKey)
	expect(storedValue.update).toBeDefined()
})

test("removal", async () => {
	// given: a fakemon in the db
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const eeveon = await provider.add(draft.data.species)

	// when: it is removed
	const singleStore = await fakemonStore.get(eeveon.data.readKey)
	await singleStore.remove()

	// then: it is no longer in the list
	const listStore = await fakemonStore.all()
	const listValue = get(listStore)
	const keys = listValue.map((it) => it.data.readKey)
	expect(keys).not.toContain(eeveon.data.readKey)

	// then: it is no longer stored
	const fromStorage = FakemonLocalStorage.get(eeveon.data.readKey)
	expect(fromStorage).toBeUndefined()
})

test("getting all tags", async () => {
	// given: a couple of fakemon in the db, some with tags
	const eeveon = await provider.add(stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	}).species.data)

	const drakeon = await provider.add(stubFakemon({
		species: stubPokemonSpecies({
			name: "Drakeon",
		}).data,
	}).species.data)

	const wyrmish = await provider.add(stubFakemon({
		species: stubPokemonSpecies({
			name: "Wyrmish",
		}).data,
	}).species.data)

	eeveon.data.tags = TagList.from(["eeveelution", "normal"])
	drakeon.data.tags = TagList.from(["eeveelution", "dragon"])
	wyrmish.data.tags = TagList.from(["bug", "dragon"])

	await provider.update(eeveon)
	await provider.update(drakeon)
	await provider.update(wyrmish)

	// load then in
	get(await fakemonStore.all())

	// when: I get the tags
	const tagStore = fakemonStore.tags()
	const allTags = get(tagStore)

	// then it combines all of the tags together
	expect(TagList.equal(allTags, TagList.from([
		"eeveelution", "normal", "dragon", "bug"
	]))).toBe(true)
})

test("updating tags on fakemon you own", async () => {
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
		tags: TagList.from(["eeveelution"])
	})
	await storedValue.tags.update(updatedFakemon)

	// then: stored value updates
	const fromStorage = await provider.getByReadKey(addedResult.data.readKey)
	expect(TagList.equal(fromStorage.tags, TagList.from(["eeveelution"]))).toBe(true)
})

test("updating tags on fakemon you do not own", async () => {
	// given: fakemon had been added
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const addedResult = await fakemonStore.new(draft.data.species)
	FakemonLocalStorage.remove(addedResult.data.readKey) // REMOVE WRITE KEY

	const singleStore = await fakemonStore.get(addedResult.data.readKey)
	const storedValue = get(singleStore)
	storedValue.value.data.writeKey = undefined

	// when: updated
	const updatedFakemon = storedValue.value.copy({
		tags: TagList.from(["eeveelution"])
	})
	await storedValue.tags.update(updatedFakemon)

	// then: local value updates
	const fromStorage = TagsLocalStorage.get(addedResult.data.readKey)
	expect(TagList.equal(fromStorage, TagList.from(["eeveelution"]))).toBe(true)
})
