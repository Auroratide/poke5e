import path from "node:path"
import fs from "node:fs/promises"
import { test as beforeTest } from "./before.js"
import { test as afterTest } from "./after.js"
import { migrate } from "../migrate.js"
import { reset } from "./reset.js"

const CANDIDATES_DIR = path.join(import.meta.dirname, "..", "candidates")
const MIGRATIONS_DIR = path.join(import.meta.dirname, "..", "migrations")

async function test() {
   await clearCandidatesFromMigrations()

   console.log("Reseting the database...")
   await reset()

   console.log("Running the before migration test...")
   await migrate()
   await beforeTest()

   await copyCandidatesIntoMigrations()

   console.log("Running the backward-compatibility migration test...")
   await migrate()
   await beforeTest() // backward compatible?
   console.log("Running the after migration test...")
   await afterTest()

   console.log("Successful test! Local database is migrated as well.")
}

async function clearCandidatesFromMigrations() {
   const candidateNames = await fs.readdir(CANDIDATES_DIR)

   await Promise.all(candidateNames.map((name) =>
      fs.rm(path.join(MIGRATIONS_DIR, name), { force: true })
   ))
}

async function copyCandidatesIntoMigrations() {
   await fs.cp(CANDIDATES_DIR, MIGRATIONS_DIR, { recursive: true })
}

test()
