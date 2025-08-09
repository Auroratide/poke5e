import { get } from "svelte/store"
import { test, expect, vi } from "vitest"
import { provider } from "$lib/fakemon/data"
import { fakemonStore } from "../FakemonStore"
import { stubFakemon } from "$lib/fakemon/test/stubs"

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
