export async function ensureDataPersistance() {
	if (!navigator.storage || !navigator.storage.persist) return
	if (await navigator.storage.persisted()) return

	await navigator.storage.persist().then((persisted) => {
		console.log(`Set persisted status: ${persisted}`)
	})
}
