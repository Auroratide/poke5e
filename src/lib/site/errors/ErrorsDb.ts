import { supabase } from "$lib/supabase"
import { DeviceId } from "../device"
import { ErrorMessages } from "./ErrorMessages"

export type ErrorDbId = string

export const ErrorsDb = {
	async report(action: string, e: unknown): Promise<ErrorDbId | undefined> {
		try {
			const deviceId = DeviceId.get()

			const { data, error } = await supabase.rpc("report_error", {
				_device_id: deviceId,
				_action: action,
				_message: ErrorMessages.detailed(e),
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
