import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 3000,
	},
	test: {
		browser: {
			provider: "playwright",
			enabled: true,
			headless: true,
			instances: [ { browser: "chromium" } ],
			screenshotFailures: false,
		}
	}
}

export default config
