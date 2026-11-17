import { createClient } from "@supabase/supabase-js"
import { mkdir, writeFile } from "node:fs/promises"
import pg from "pg"
import { afterAll, beforeAll, expect, test } from "vitest"
import { config } from "./config"
import { measureAllRpcs, type RpcMeasurementReport } from "./rpcs"
import { refreshDbAnalysis, seedFakemon, seedTrainers } from "./seed"

const TEST_TIMEOUT = 120000

// We do not want this ever running in an upper environment for now
function expectLocalEnvironmentOnly() {
	expect(config.db.postgresUrl).toContain("127.0.0.1")
	expect(config.db.supabaseUrl).toContain("127.0.0.1")
}

const db = new pg.Client({ connectionString: config.db.postgresUrl })

beforeAll(async () => {
	expectLocalEnvironmentOnly()

	await db.connect()
})

afterAll(async () => {
	await db.end()
})

test("create load test report", async () => {
	console.log("Seeding data into the database...")
	await seedTrainers(db)
	await seedFakemon(db)
	await refreshDbAnalysis(db)

	const supabase = createClient(config.db.supabaseUrl, config.db.supabaseKey)

	const report = await measureAllRpcs(db, supabase)

	const reportFilename = await writeReport(report)
	console.log(`Report written to ${reportFilename}`)
}, TEST_TIMEOUT)

async function writeReport(report: RpcMeasurementReport): Promise<string> {
	const directory = new URL("./results/", import.meta.url)
	await mkdir(directory, { recursive: true })

	const now = new Date()
	const timestamp = now.toISOString().replaceAll(":", "-")
	const file = new URL(`${timestamp}.json`, directory)

	await writeFile(file, JSON.stringify({
		timestamp: now.toISOString(),
		seed: config.seed,
		measurements: report,
	}, null, "\t"))

	return file.pathname
}
