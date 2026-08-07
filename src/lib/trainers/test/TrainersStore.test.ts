import { describe, test, expect } from "vitest"
import { trainers as TrainersStore, createStore } from "../trainers"
import { provider } from "../data"
import { get } from "svelte/store"
import * as list from "$lib/utils/list"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { TrainerLocalStorage } from "../data/TrainerLocalStorage"
import { TagList } from "$lib/poke5e/tags"

const trainerDraft = (name: string) => ({
	name: name,
	description: "",
	hp: {
		current: 6,
		max: 6,
	},
})

/**
 * The store is a module-level singleton, so its cache of trainers survives
 * between tests. Every test therefore works off its own freshly created
 * trainer, so no two tests touch the same read key.
 */
const createTrainer = async (name: string) => {
	const created = await provider.newTrainer(trainerDraft(name))
	const store = await TrainersStore.get(created.info.readKey)

	return { created, store }
}

const addPokemon = async (store: Awaited<ReturnType<typeof TrainersStore.get>>, name: string) => {
	return get(store).update.addToTeam(stubPokemonSpecies({
		id: name.toLowerCase(),
		name: name,
	}))
}

describe("basic flows", async () => {
	test("list then single", async () => {
		// given: some trainers
		const store = createStore()
		const renibel = await provider.newTrainer(trainerDraft("Renibel"))
		await provider.newTrainer(trainerDraft("Iris"))
		await provider.newTrainer(trainerDraft("Blis"))
	
		// when: get all
		const allStore = await store.all()
		const allGotten = get(allStore)
	
		// then: received them all
		expect(allGotten.length).toEqual(3)
		expect(allGotten.map((it) => it.name)).toEqual(["Renibel", "Iris", "Blis"])
	
		// when: getting one trainer
		const singleStore = await store.get(renibel.info.readKey)
		const singleGotten = get(singleStore)
	
		// then: received it
		expect(singleGotten.info.name).toEqual("Renibel")
	
		// when: pokemon added to trainer
		const species = stubPokemonSpecies({
			id: "mimikyu",
			name: "Mimikyu",
		})
		await singleGotten.update.addToTeam(species)
		const singy = await store.get(renibel.info.readKey)
		const singleAfterUpdate = get(singy)
	
		// then: the trainer has the pokemon
		expect(singleAfterUpdate.pokemon.length).toEqual(1)
		expect(singleAfterUpdate.pokemon[0].nickname).toEqual("Mimikyu")
	})

	test("single then list", async () => {
		// given: some trainers
		const store = createStore()
		await provider.newTrainer(trainerDraft("Renibel"))
		await provider.newTrainer(trainerDraft("Iris"))
		const blis = await provider.newTrainer(trainerDraft("Blis"))

		// when: get one
		const singleStore = await store.get(blis.info.readKey)
		const singleGotten = get(singleStore)

		// then: received it
		expect(singleGotten.info.name).toEqual("Blis")
	
		// when: get all
		const allStore = await store.all()
		const allGotten = get(allStore)
	
		// then: received them all
		expect(allGotten.length).toEqual(3)
		expect(allGotten.map((it) => it.name)).toEqual(["Renibel", "Iris", "Blis"])
	
		// when: pokemon added to trainer
		const gottenAgain = get(singleStore)
		const species = stubPokemonSpecies({
			id: "mimikyu",
			name: "Mimikyu",
		})
		await gottenAgain.update.addToTeam(species)
		const singy = await store.get(blis.info.readKey)
		const singleAfterUpdate = get(singy)
	
		// then: the trainer has the pokemon
		expect(singleAfterUpdate.pokemon.length).toEqual(1)
		expect(singleAfterUpdate.pokemon[0].nickname).toEqual("Mimikyu")
	})
})


describe("new", () => {
	test("creates a trainer that is immediately editable", async () => {
		// when: a trainer is made through the store
		const created = await TrainersStore.new(trainerDraft("Wisteria"))

		// then: it can be read back out
		const store = await TrainersStore.get(created.info.readKey)
		const gotten = get(store)

		expect(gotten.info.name).toEqual("Wisteria")

		// and: the creator holds the write key, so editing is available
		expect(gotten.update).toBeDefined()
	})
})

describe("update.info", () => {
	test("writes the new info into the store", async () => {
		// given: a trainer
		const { store } = await createTrainer("Renibel")
		const before = get(store)

		// when: info is changed
		await before.update.info({
			...before.info,
			name: "Renibel Komari",
			money: 250,
		})

		// then: the store reflects it
		const after = get(store)
		expect(after.info.name).toEqual("Renibel Komari")
		expect(after.info.money).toEqual(250)
	})

	test("optimistic update applies before the request settles", async () => {
		// given: a trainer
		const { store } = await createTrainer("Iris")
		const before = get(store)

		// when: info is changed optimistically, and NOT awaited
		const pending = before.update.info({
			...before.info,
			name: "Iris Cottonstain",
		}, { optimistic: true })

		// then: the store has already changed
		expect(get(store).info.name).toEqual("Iris Cottonstain")

		// and: it stays changed once the request finishes
		await pending
		expect(get(store).info.name).toEqual("Iris Cottonstain")
	})

	test("non-optimistic update waits for the request", async () => {
		// given: a trainer
		const { store } = await createTrainer("Iris")
		const before = get(store)

		// when: info is changed without the optimistic flag, and NOT awaited
		const pending = before.update.info({
			...before.info,
			name: "Iris Deferred",
		})

		// then: the store has NOT changed yet
		// (this is what makes the optimistic test above meaningful)
		expect(get(store).info.name).toEqual("Iris")

		// and: it changes only once the request finishes
		await pending
		expect(get(store).info.name).toEqual("Iris Deferred")
	})
})

describe("update.inventory", () => {
	test("replaces the whole inventory", async () => {
		// given: a trainer
		const { store } = await createTrainer("Blis")
		const before = get(store)

		// when: an inventory is set
		await before.update.inventory({
			...before.info,
			inventory: [ {
				id: "unsaved",
				type: "standard",
				itemId: "potion",
				quantity: 2,
			} ],
		})

		// then: the store holds the saved inventory
		const after = get(store)
		expect(after.info.inventory.length).toEqual(1)
		expect(after.info.inventory[0]).toMatchObject({
			type: "standard",
			itemId: "potion",
			quantity: 2,
		})
	})

	test("updates a single item in place", async () => {
		// given: a trainer with an item
		const { store } = await createTrainer("Blis")
		await get(store).update.inventory({
			...get(store).info,
			inventory: [ {
				id: "unsaved",
				type: "standard",
				itemId: "potion",
				quantity: 2,
			} ],
		})
		const saved = get(store).info.inventory[0]

		// when: just that item is updated
		await get(store).update.inventoryItem({
			...saved,
			quantity: 9,
		})

		// then: the quantity changed, and no item was added
		const after = get(store)
		expect(after.info.inventory.length).toEqual(1)
		expect(after.info.inventory[0].quantity).toEqual(9)
	})
})

describe("update.pokemon", () => {
	test("updates a pokemon on the team", async () => {
		// given: a trainer with a pokemon
		const { store } = await createTrainer("Renibel")
		const pokemon = await addPokemon(store, "Mimikyu")

		// when: the pokemon is changed
		await get(store).update.pokemon({
			...pokemon,
			nickname: "Spook",
			hp: {
				current: 3,
				max: 12,
			},
		})

		// then: the store reflects it
		const after = get(store)
		expect(after.pokemon.length).toEqual(1)
		expect(after.pokemon[0].nickname).toEqual("Spook")
		expect(after.pokemon[0].hp.current).toEqual(3)
	})

	test("sets a moveset", async () => {
		// given: a trainer with a pokemon
		const { store } = await createTrainer("Iris")
		const pokemon = await addPokemon(store, "Eevee")

		// when: moves are set
		await get(store).update.moveset({
			...pokemon,
			moves: [ {
				id: "unsaved",
				moveId: "tackle",
				pp: {
					current: 10,
					max: 10,
				},
				notes: "",
			} ],
		})

		// then: the store holds the saved moveset
		const after = get(store)
		expect(after.pokemon[0].moves.length).toEqual(1)
		expect(after.pokemon[0].moves[0].moveId).toEqual("tackle")
	})

	test("removes a pokemon from the team", async () => {
		// given: a trainer with two pokemon
		const { store } = await createTrainer("Blis")
		const first = await addPokemon(store, "Eevee")
		await addPokemon(store, "Mimikyu")

		// when: one is removed
		await get(store).update.removeFromTeam(first.id)

		// then: only the other remains
		const after = get(store)
		expect(after.pokemon.length).toEqual(1)
		expect(after.pokemon[0].nickname).toEqual("Mimikyu")
	})

	test("reorders the team", async () => {
		// given: a trainer with two pokemon
		const { store } = await createTrainer("Wisteria")
		await addPokemon(store, "Eevee")
		await addPokemon(store, "Mimikyu")
		const original = get(store).pokemon

		// when: the team is reordered
		await get(store).update.reorderTeam(list.reorderOne(original, 1, 0))

		// then: the store reflects the new order
		const after = get(store)
		expect(after.pokemon.map((it) => it.nickname)).toEqual(["Mimikyu", "Eevee"])
	})
})

describe("retire", () => {
	test("drops the trainer out of the store", async () => {
		// given: a trainer known to the store, and present in the trainer list
		const { created, store } = await createTrainer("Nessa")
		expect(get(store).info.name).toEqual("Nessa")

		const allStore = await TrainersStore.all()
		expect(get(allStore).map((it) => it.readKey)).toContain(created.info.readKey)

		// when: retired
		await get(store).update.retire()

		// then: it is gone from the trainer list
		expect(get(allStore).map((it) => it.readKey)).not.toContain(created.info.readKey)
	})
})

describe("verifyAccess", () => {
	test("unlocks editing when the write key is correct", async () => {
		// given: a trainer whose write key this browser does not have
		const created = await provider.newTrainer(trainerDraft("Sage"))
		TrainerLocalStorage.removeWriteKey(created.info.readKey)

		const store = await TrainersStore.get(created.info.readKey)

		// then: read-only to start
		expect(get(store).update).toBeUndefined()

		// when: the write key is presented
		const verified = await store.verifyAccess(created.writeKey)

		// then: editing becomes available
		expect(verified).toEqual(true)
		expect(get(store).update).toBeDefined()
	})

	test("stays read-only when the write key is wrong", async () => {
		// given: a trainer whose write key this browser does not have
		const created = await provider.newTrainer(trainerDraft("Marnie"))
		TrainerLocalStorage.removeWriteKey(created.info.readKey)

		const store = await TrainersStore.get(created.info.readKey)

		// when: a bad write key is presented
		const verified = await store.verifyAccess("not-the-write-key")

		// then: still read-only
		expect(verified).toEqual(false)
		expect(get(store).update).toBeUndefined()

		// and: the real key still works, proving the check above was not vacuous
		expect(await store.verifyAccess(created.writeKey)).toEqual(true)
		expect(get(store).update).toBeDefined()
	})
})

describe("tags", () => {
	test("updates a trainer's tags", async () => {
		// given: a trainer
		const { store } = await createTrainer("Fen")

		// when: tags are set
		await get(store).tags.trainer({
			...get(store).info,
			tags: TagList.from(["rival"]),
		})

		// then: the store reflects them
		expect(get(store).info.tags).toEqual(["rival"])
	})

	test("collects the tags of every known trainer", async () => {
		// given: two tagged trainers
		const { store: first } = await createTrainer("Ivy")
		const { store: second } = await createTrainer("Wren")

		await get(first).tags.trainer({
			...get(first).info,
			tags: TagList.from(["campaign-a"]),
		})
		await get(second).tags.trainer({
			...get(second).info,
			tags: TagList.from(["campaign-b"]),
		})

		// then: the derived tag list includes both
		const allTags = get(TrainersStore.tags())
		expect(allTags).toContain("campaign-a")
		expect(allTags).toContain("campaign-b")
	})
})

describe("reorder", () => {
	test("it reorders trainers", async () => {
		// given: some trainers in some order
		const store = createStore()
		await provider.newTrainer(trainerDraft("Renibel"))
		await provider.newTrainer(trainerDraft("Iris"))
		await provider.newTrainer(trainerDraft("Blis"))

		// when: get all
		const allStore = await store.all()
		const allGotten = get(allStore)

		// then: received them all
		expect(allGotten.length).toEqual(3)
		expect(allGotten.map((it) => it.name)).toEqual(["Renibel", "Iris", "Blis"])

		// when: reordering
		await allStore.reorder([allGotten[2], allGotten[0], allGotten[1]])
		const after = get(allStore)

		// then: the new order is applied
		expect(after.map((it) => it.name)).toEqual(["Blis", "Renibel", "Iris"])
	})
})
