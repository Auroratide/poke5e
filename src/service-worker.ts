/// <reference lib="WebWorker" />
import { build, version } from "$service-worker"
declare const self: ServiceWorkerGlobalScope

const cacheName = `poke5e-${version}`

const install = async () => {
	const cache = await caches.open(cacheName)
	await cache.addAll(build)
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

self.addEventListener("fetch", () => {})
