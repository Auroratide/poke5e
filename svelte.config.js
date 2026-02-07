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

				throw new Error(message);
			}
		},
		paths: { relative: false },
		adapter: adapter({ fallback: "404.html" })
	},
	extensions: [".svelte", ".svx"]
};

export default config;
