import { env } from "./env"
import { createClient } from "@supabase/supabase-js"
import { expect } from "vitest"

export const supabase = createClient(env.supabaseUrl, env.supabaseKey)

// A distinct storage key per client avoids "Multiple GoTrueClient instances" warnings
const isolatedClient = (key: string, storageKey: string) => createClient(env.supabaseUrl, key, {
	auth: { persistSession: false, autoRefreshToken: false, storageKey },
})

export const admin = isolatedClient(env.supabaseServiceRoleKey, "test-admin")

export type TestUser = {
	id: string,
	client: typeof supabase,
}

export async function newUser(): Promise<TestUser> {
	const email = `test-${crypto.randomUUID()}@example.com`
	const password = crypto.randomUUID()

	const { data: created, error: createError } = await admin.auth.admin.createUser({
		email,
		password,
		email_confirm: true,
	})

	if (createError) throw new Error(`Could not create user: ${createError.message}`)

	const client = isolatedClient(env.supabaseKey, `test-user-${created.user.id}`)
	const { error: signInError } = await client.auth.signInWithPassword({ email, password })
	if (signInError) throw new Error(`Could not sign in user: ${signInError.message}`)

	return { id: created.user.id, client }
}

export async function deleteUser(user: TestUser) {
	const { error } = await admin.auth.admin.deleteUser(user.id)
	if (error) throw new Error(`Could not delete user: ${error.message}`)
}

export async function call<T>(name: string, args: any, options?: {
	assertNull?: boolean,
}): Promise<T> {
	const { data, error } = await supabase.rpc(name, args).maybeSingle<T>()

	if (options?.assertNull && data != null) {
		throw new Error(`Calling ${name}, expected null result but was not. Got: ${data}`)
	}

	if (!options?.assertNull && data == null) {
		throw new Error(`Calling ${name} resulted in null result; error: ${error?.message}`)
	}

	if (error) {
		throw new Error(`Calling ${name} resulted in error: ${error.message}`)
	}

	return data!
}

export async function callAll<T>(name: string, args: any): Promise<T[]> {
	const { data, error } = await supabase.rpc(name, args).select()

	if (error) {
		throw new Error(`Calling ${name} resulted in error: ${error.message}`)
	}

	if (data == null) {
		throw new Error(`Calling ${name} resulted in null result`)
	}

	return data
}

type StorageError = {
	statusCode: string
}
export async function expectError(expectedCode: string, action: (client: typeof supabase) => Promise<{ error: any }>) {
	const { error } = await action(supabase)

	if (error == null) {
		throw new Error(`Expected error ${expectedCode}, but was successful`)
	}

	if ("statusCode" in error) {
		expect(error.statusCode).toEqual(expectedCode)
	} else if ("code" in error) {
		expect(error.code).toEqual(expectedCode)
	}
}
