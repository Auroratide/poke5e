import { paraglideVitePlugin } from "@inlang/paraglide-js"
import path from "node:path"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/site/i18n/paraglide",
			strategy: ["url", "baseLocale"],
		}),
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
})
