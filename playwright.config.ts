import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [["html", { open: "never" }]],
	use: {
		screenshot: "only-on-failure",
		baseURL: process.env.BASE_URL ?? "http://localhost:3000",
	},
	projects: [
		{
			name: "smoke",
			testDir: "./test/smoke",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			// Pure HTTP checks against the prerendered output — no browser needed.
			name: "srd",
			testDir: "./test/srd",
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: "pnpm dev",
	//   url: "http://localhost:3000",
	//   reuseExistingServer: !process.env.CI,
	// },
})
