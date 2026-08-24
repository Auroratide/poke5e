import { paraglideVitePlugin } from "@inlang/paraglide-js"
import path from "node:path"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/site/i18n/paraglide",
			strategy: ["url", "baseLocale"],
		}),
	],
	server: {
		port: 3000,
	},
	optimizeDeps: {
		exclude: ["fsevents"],
	},
	test: {
		projects: [ {
			extends: true,
			test: {
				name: "browser",
				setupFiles: [path.join("src", "test", "setup.ts")],
				browser: {
					provider: playwright(),
					enabled: true,
					headless: true,
					instances: [ { browser: "chromium" } ],
					screenshotFailures: false,
				},
				exclude: [
					"**\/node_modules/**",
					"**\/supabase/functions/**",
					"**/*.node.test.ts",
				],
			}
		}, {
			extends: true,
			test: {
				name: "buildtime",
				environment: "node",
				include: ["**/*.node.test.ts"]
			},
		} ]
	}
})
