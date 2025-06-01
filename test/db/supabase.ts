import { env } from "./env"
import { createClient } from "@supabase/supabase-js"
import { expect } from "vitest"

export const supabase = createClient(env.supabaseUrl, env.supabaseKey)

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

	if ("code" in error) {
		expect(error.code).toEqual(expectedCode)
	}
	
	if ("statusCode" in error) {
		expect(error.statusCode).toEqual(expectedCode)
	}
}
