import { mdsvex } from "mdsvex";

/* eslint-disable no-undef */
import adapter from "@sveltejs/adapter-static";

import preprocess from "svelte-preprocess";

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
				"/pokemon/[id].json"
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
