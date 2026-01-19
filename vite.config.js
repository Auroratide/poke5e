import { paraglideVitePlugin } from "@inlang/paraglide-js"
import path from "node:path"
import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		// paraglideVitePlugin({
		// 	project: "./project.inlang",
		// 	outdir: "./src/lib/site/i18n/paraglide",
		// 	strategy: ["url", "baseLocale"],
		// 	exclude: [
		// 		/^\/src\/.*\.test\.js$/,
		// 		/^\/@vitest\//,
		// 		/^\/__vitest\//,
		// 		/^\/virtual:/,
		// 		/^\/@fs\//,
		// 	],
		// }),
		sveltekit(),
	],
	server: {
		port: 3000,
	},
	test: {
		setupFiles: [path.join("src", "test", "setup.ts")],
		browser: {
			provider: "playwright",
			enabled: true,
			headless: true,
			instances: [ { browser: "chromium" } ],
			screenshotFailures: false,
		},
		exclude: [
			"**\/node_modules/**",
			"**\/supabase/functions/**",
		],
	}
}

export default config
