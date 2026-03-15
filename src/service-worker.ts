/// <reference lib="WebWorker" />
import { build, files, version } from "$service-worker"
declare const self: ServiceWorkerGlobalScope

const cacheName = `poke5e-${version}`

const ASSETS = [
	...build,
	// ...files, // there are WAY too many of these...
]

const install = async () => {
	const cache = await caches.open(cacheName)
	await cache.addAll(ASSETS)
}
self.addEventListener("install", (e) => e.waitUntil(install()))

const activate = async () => {
	const keys = await caches.keys()
	await Promise.all(keys.map(key => {
		if (key === cacheName) return
		return caches.delete(key)
	}))
}
self.addEventListener("activate", (e) => e.waitUntil(activate()))

self.addEventListener("fetch", () => {
	// if (e.request.method !== "GET") return

	// async function respond() {
	// 	const url = new URL(e.request.url)
	// 	const cache = await caches.open(cacheName)

	// 	if (ASSETS.includes(url.pathname)) {
	// 		const response = await cache.match(url.pathname)
	// 		if (response) return response
	// 	}

	// 	try {
	// 		const response = await fetch(e.request)

	// 		if (!(response instanceof Response)) {
	// 			throw new Error("Invalid response from fetch")
	// 		}

	// 		if (response.status === 200) {
	// 			cache.put(e.request, response.clone())
	// 		}

	// 		return response
	// 	} catch (err) {
	// 		const response = await cache.match(e.request)

	// 		if (response) return response

	// 		throw err
	// 	}
	// }

	// e.respondWith(respond())
})
