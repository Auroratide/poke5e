import * as path from "path"
import { fileURLToPath } from "url"
import { migrate as pgMigrate } from "postgres-migrations"
import { env } from "./env.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsPath = path.resolve(__dirname, "migrations")

export async function migrate() {
	const config = {
		database: env.database,
		user: env.user,
		password: env.password,
		host: env.host,
		port: env.port,
		ensureDatabaseExists: true,
		defaultDatabase: "postgres",
	}

	await pgMigrate(config, migrationsPath)
	console.log("Successfully migrated")
}
