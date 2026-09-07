import { mdsvex } from "mdsvex";

/* eslint-disable no-undef */
import adapter from "@sveltejs/adapter-static";

import preprocess from "svelte-preprocess";

import { readFileSync } from "node:fs";

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
				...localizedLegacyApi
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
		paths: { relative: false },
		alias: {
			"$reference/*": "src/routes/reference/*",
		},
		adapter: adapter({ fallback: "404.html" })
	},
	extensions: [".svelte", ".svx"]
};

export default config;
