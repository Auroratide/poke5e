import { supabase } from "$lib/supabase"

export type ErrorDbId = string

export const ErrorsDb = {
	async report(action: string, message: string): Promise<ErrorDbId | undefined> {
		try {
			const { data, error } = await supabase.rpc("report_error", {
				_device_id: null, // future idea
				_action: action,
				_message: message,
			}).single<{
				ret_id: string,
			}>()

			if (error) {
				console.error(error)
			}

			return data.ret_id
		} catch (e) {
			console.error(e)
		}

		return undefined
	},
} as const
