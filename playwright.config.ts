import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
	testDir: "./test/smoke",
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
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: "pnpm dev",
	//   url: "http://localhost:3000",
	//   reuseExistingServer: !process.env.CI,
	// },
})
