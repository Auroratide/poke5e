import path from "node:path"
import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
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
