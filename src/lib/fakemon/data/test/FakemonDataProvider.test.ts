import { test, expect } from "vitest"
import { provider } from ".."
import { FakemonPermissionError } from "../FakemonDataProvider"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { FakemonLocalStorage } from "../FakemonLocalStorage"
import type { ImageInputValue } from "$lib/design/forms"
import { stubImageFile } from "$lib/test/files"
import { stubPokemonSpecies } from "$lib/creatures/species/test/stubs"
import { stubSpeciesMedia } from "$lib/creatures/media/test/stubs"

test("add, get, and update", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)
	const received = await provider.getByReadKey(added.data.readKey)
	expect(received.data.species.name).toEqual(draft.data.species.name)

	added.data.species.name = "Aereon"
	const didUpdate = await provider.update(added)
	expect(didUpdate).toBe(true)

	const afterUpdate = await provider.getByReadKey(added.data.readKey)
	expect(afterUpdate.data.species.name).toEqual("Aereon")
})

test("no permission to update", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)
	localStorage.clear()

	const received = await provider.getByReadKey(added.data.readKey)

	// result of get is not supposed to have a write key
	received.data.species.name = "Aereon"
	await expect(provider.update(received)).rejects.toThrow(FakemonPermissionError)
})

test("getAllKnown", async () => {
	const drakeon = stubFakemon({
		species: stubPokemonSpecies({
			name: "Drakeon",
		}).data,
	})
	const droideon = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	await provider.add(drakeon.data.species)
	await provider.add(droideon.data.species)

	const result = await provider.getAllKnown()
	const resultNames = result.map((it) => it.data.species.name)

	expect(resultNames).toHaveLength(2)
	expect(resultNames).toContain("Drakeon")
	expect(resultNames).toContain("Droideon")
})

test("getAllKnown, but one is invalid", async () => {
	FakemonLocalStorage.add({
		id: "fake id",
		readKey: "fake key",
	})

	const drakeon = stubFakemon({
		species: stubPokemonSpecies({
			name: "Drakeon",
		}).data,
	})

	await provider.add(drakeon.data.species)

	const result = await provider.getAllKnown()
	const resultNames = result.map((it) => it.data.species.name)

	expect(resultNames).toHaveLength(1)
	expect(resultNames).toContain("Drakeon")
})

test("uploading new media", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Droideon",
		}).data,
	})

	const added = await provider.add(draft.data.species)
	const received = await provider.getByReadKey(added.data.readKey)
	expect(received.data.species.name).toEqual(draft.data.species.name)

	const result = await provider.updateMedia(added.data.writeKey, stubSpeciesMedia<ImageInputValue>({
		shinyPortrait: {
			type: "new",
			value: stubImageFile("img.png"),
		},
	}))

	expect(result.data.normalPortrait).toBeUndefined()
	expect(result.data.normalSprite).toBeUndefined()
	expect(result.data.shinySprite).toBeUndefined()
	expect(result.data.shinyPortrait?.name).toBeDefined()
	expect(result.data.shinyPortrait?.href).toBeDefined()

	const afterUpdate = await provider.getByReadKey(added.data.readKey)
	expect(afterUpdate.data.species.media.shinyPortrait?.name).toEqual(result.data.shinyPortrait.name)

	// include a deletion
	const resultWithDelete = await provider.updateMedia(added.data.writeKey, stubSpeciesMedia<ImageInputValue>({
		normalPortrait: {
			type: "new",
			value: stubImageFile("img.png"),
		},
		shinyPortrait: {
			type: "remove",
		},
	}))

	expect(resultWithDelete.data.normalPortrait?.name).toBeDefined()
	expect(resultWithDelete.data.normalSprite).toBeUndefined()
	expect(resultWithDelete.data.shinyPortrait).toBeUndefined()
	expect(resultWithDelete.data.shinySprite).toBeUndefined()

	const afterDeletion = await provider.getByReadKey(added.data.readKey)

	expect(afterDeletion.data.species.media.normalPortrait?.name).toEqual(resultWithDelete.data.normalPortrait.name)
	expect(afterDeletion.data.species.media.shinyPortrait).toBeUndefined()
})
