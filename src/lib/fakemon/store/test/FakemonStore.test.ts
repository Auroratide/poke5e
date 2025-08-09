import { get } from "svelte/store"
import { test, expect, vi } from "vitest"
import { provider } from "$lib/fakemon/data"
import { fakemonStore } from "../FakemonStore"
import { stubFakemon } from "$lib/fakemon/test/stubs"

test("new fakemon", async () => {
	// given: a draft fakemon
	const getFakemon = vi.spyOn(provider, "getByReadKey")

	const draft = stubFakemon({
		speciesName: "Eeveon",
	})

	// when: it is added
	const addedResult = await fakemonStore.new(draft.data)

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
		speciesName: "Eeveon",
	})

	const eeveon = await provider.add(draft.data)

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
		speciesName: "Eeveon",
	})

	const addedResult = await fakemonStore.new(draft.data)
	const singleStore = await fakemonStore.get(addedResult.data.readKey)
	const storedValue = get(singleStore)

	// when: updated
	const updatedFakemon = storedValue.value.copy({
		speciesName: "Droideon",
	})
	await storedValue.update?.info(updatedFakemon)

	// then: new value is updated
	const singleStoreAfterUpdate = await fakemonStore.get(addedResult.data.readKey)
	const storedValueAfterUpdate = get(singleStoreAfterUpdate)

	expect(storedValueAfterUpdate.value.data.speciesName).toEqual("Droideon")

	// and: never retrieved from the provider since it was added
	expect(getFakemon).not.toHaveBeenCalled()
})

test("listing fakemon", async () => {
	// given: some fakemon in the db
	const eeveonDraft = stubFakemon({ speciesName: "Eeveon" })
	const drakeonDraft = stubFakemon({ speciesName: "Drakeon" })

	await provider.add(eeveonDraft.data)
	await provider.add(drakeonDraft.data)

	// when: we get the list
	const listStore = await fakemonStore.all()
	const listResult = get(listStore)
	const resultNames = listResult.map((it) => it.data.speciesName)
	
	// then: it contains all the fakemon
	expect(resultNames).toContain("Eeveon")
	expect(resultNames).toContain("Drakeon")
})
