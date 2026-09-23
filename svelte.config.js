import { mdsvex } from "mdsvex";

/* eslint-disable no-undef */
import adapter from "@sveltejs/adapter-static";

import preprocess from "svelte-preprocess";

import { readdirSync, readFileSync } from "node:fs";

/**
 * Kept for backwards compatibility for now.
 */
const settings = JSON.parse(readFileSync("project.inlang/settings.json", "utf-8"));
const legacyMoveIds = JSON.parse(readFileSync("static/data/moves.json", "utf-8")).moves.map((it) => it.id);
const legacyApiPaths = [
	"/moves.json",
	"/contest-effects.json",
	...legacyMoveIds.map((id) => `/moves/${id}.json`),
];
const localizedLegacyApi = settings.locales
	.filter((locale) => locale !== settings.baseLocale)
	.flatMap((locale) => legacyApiPaths.map((path) => `/${locale}${path}`));

/**
 * Entry generators only produce the base locale's SRD urls. Localized SRD files
 * are otherwise only prerendered if the crawler happens to hit them, and the
 * client-side stores fetch lists (e.g. /de/srd/v1/2018/pokemon.json) that no
 * prerendered page references.
 */
const srdEditions = ["2018", "2024"];
const srdListResources = readdirSync("src/routes/srd/v1/[edition]")
	.filter((name) => name.endsWith(".json"));
const localizedSrdLists = settings.locales
	.filter((locale) => locale !== settings.baseLocale)
	.flatMap((locale) => srdEditions.flatMap((edition) =>
		srdListResources.map((resource) => `/${locale}/srd/v1/${edition}/${resource}`)));

/**
 * The only files from `static` the app shell needs in order to render. Everything
 * else in there is pokemon art -- 300+MB of it -- which offline mode downloads on
 * demand rather than precaching. Narrowing this keeps the entire list of static
 * files from being inlined into service-worker.js.
 */
const serviceWorkerFiles = [
	/^styles\/.+\.css$/,
	/^fonts\/.+\.(?:css|woff2)$/,
	/^icons\/.+\.png$/,
	/^poke5e\.webmanifest$/,
	/^missingno\.png$/,
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex()],
	kit: {
		prerender: {
			entries: [
				"*",
				// hidden pages
				"/backups/schemas/2026-02",
				// backward compatibility
				"/pokemon.json",
				"/pokemon/[id].json",
				...localizedLegacyApi,
				...localizedSrdLists
			],

			handleHttpError: ({ path, message }) => {
				// idk why, but it likes to include this bit when scanning
				if (path.includes("[id]")) return;

				// Most moves have no contest entry, so a move page asking for one
				// is expected to 404; the page renders without contest info.
				// This is necessary because, even if you swallow the 404, sveltekit
				// does not, and there's literally no way around that
				if (/\/srd\/v1\/[^/]+\/contest\/[^/]+\.json$/.test(path)) return;

				throw new Error(message);
			}
		},
		serviceWorker: {
			files: (filename) => serviceWorkerFiles.some((it) => it.test(filename)),
		},
		paths: { relative: false },
		alias: {
			"$reference/*": "src/routes/reference/*",
		},
		adapter: adapter({ fallback: "404.html" })
	},
	extensions: [".svelte", ".svx"]
};

export default config;
