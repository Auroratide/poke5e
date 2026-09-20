/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { base, build, files, version } from "$service-worker"

declare const self: ServiceWorkerGlobalScope

const CACHE_PREFIX = "poke5e-"

/**
 * Bare app minimum (js, css, icons, etc).
 * Rebuilt every deploy.
 */
const shellCache = `${CACHE_PREFIX}shell-${version}`

/**
 * Content user explicitly downloaded. Includes heavier assets.
 * NOT keyed on version, because we don't want to force redownload
 * on every release.
 */
const offlineCache = `${CACHE_PREFIX}offline`

/**
 * NOT the 404 page. This is just the same for the main SPA page Github
 * goes to when a static page does not exist. It is defined in the svelte config.
 */
const appShell = `${base}/404.html`

const ASSETS = [
	...build,
	...files,
]

/**
 * Stored manually because we need to rewrite the 404 status code to 200.
 * This caches the fallback SPA page.
 */
const addAppShell = async (cache: Cache) => {
	const response = await fetch(appShell)
	if (!response.ok && response.status !== 404)
		throw new Error(`Unexpected ${response.status} for the app shell`)

	await cache.put(appShell, new Response(await response.blob(), {
		status: 200,
		headers: { "content-type": "text/html; charset=utf-8" },
	}))
}

/**
 * Instead of using addAll, this caches individually in order to let the
 * worker install even if there's a miss.
 */
const install = async () => {
	const cache = await caches.open(shellCache)

	const results = await Promise.allSettled([
		addAppShell(cache),
		...ASSETS.map((it) => cache.add(it)),
	])
	const failures = results.filter((it) => it.status === "rejected")

	if (failures.length > 0)
		console.warn(`[poke5e] ${failures.length} of ${results.length} shell assets could not be cached`)

	console.log("[poke5e] DONE INSTALLING")
}
self.addEventListener("install", (e) => e.waitUntil(install()))

/**
 * Remove the shell cache, but keep the download cache.
 */
const activate = async () => {
	const keys = await caches.keys()
	console.log("[poke5e] START ACTIVATING", keys.length)
	await Promise.all(keys
		.filter((it) => it.startsWith(CACHE_PREFIX))
		.filter((it) => it !== shellCache && it !== offlineCache)
		.map((it) => caches.delete(it)))

	console.log("[poke5e] DONE DELETING, now CLAIMING")

	await self.clients.claim()

	console.log("[poke5e] DONE ACTIVATING")
}
self.addEventListener("activate", (e) => e.waitUntil(activate()))

/** Content-hashed by vite, so a cached copy can never be out of date. */
const isImmutable = (url: URL) => url.pathname.startsWith(`${base}/_app/immutable/`)

const cacheFirst = async (request: Request) => {
	const cached = await caches.match(request)

	return cached ?? fetch(request)
}

/** Whoever can reach the network should see the live site. */
const networkFirst = async (request: Request) => {
	try {
		return await fetch(request)
	} catch (err) {
		const cached = await caches.match(request)
		if (cached) return cached

		throw err
	}
}

/** Offline, every page is rendered client side from the spa shell. */
const shellFallback = async (request: Request) => {
	try {
		return await fetch(request)
	} catch (err) {
		const shell = await caches.match(appShell)
		if (shell == null) throw err

		return shell
	}
}

self.addEventListener("fetch", (e) => {
	if (e.request.method !== "GET") return

	const url = new URL(e.request.url)

	// supabase and other third parties are left entirely alone
	if (url.origin !== self.location.origin) return

	if (e.request.mode === "navigate")
		e.respondWith(shellFallback(e.request))
	else if (isImmutable(url))
		e.respondWith(cacheFirst(e.request))
	else
		e.respondWith(networkFirst(e.request))
})
