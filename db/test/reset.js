import pg from "pg"
import { env } from "../env.js"

export async function reset() {
   if (env.host !== "localhost") {
      throw new Error("STOP!!! Cannot reset anything except a localhost database")
   }

   const { Client } = pg
   const client = new Client({
      user: env.user,
      database: env.database,
      password: env.password,
      host: env.host,
      port: env.port,
   })

   await client.connect()

   try {
      const functionNames = await client.query("SELECT p.proname as name, pg_catalog.pg_get_function_identity_arguments(p.oid) AS args FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid JOIN pg_roles r ON p.proowner = r.oid WHERE n.nspname = 'public' AND r.rolname = 'postgres'")

      await Promise.all(functionNames.rows.map(({ name, args }) =>
         client.query(`DROP FUNCTION ${name}(${args}) CASCADE`)
      ))

      await client.query("DROP SCHEMA IF EXISTS private CASCADE")
      await client.query("DELETE FROM migrations")
   } finally {
      client.end()
   }
}
