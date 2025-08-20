import "@supabase/functions-js"
import { Responses } from "./Responses.ts"
import { DataProvider } from "./DataProvider.ts"

import { getUploadUrl, UploadUrlParams } from "./user-assets.ts"
import { initSupabase } from "./supabase.ts"
import { initS3 } from "./s3.ts"
import { UserAssetsProvider } from "./UserAssetsProvider.ts";
import { env } from "./env.ts"
import { handleCors } from "./cors.ts";

const supabase = initSupabase()
const s3 = initS3()

const dataProvider = new DataProvider(supabase)
const userAssetsProvider = new UserAssetsProvider(s3, env.S3_BUCKET_NAME)

export type RequestBody = UploadUrlParams

export type ResponseBody = {
	values: {
		filename: string,
		uploadUrl: string,
	},
}

// deno-lint-ignore no-explicit-any
function isValidType(body: any): body is RequestBody {
	return body.type === "pokemon-avatar"
}

Deno.serve((req) => {
	return handleCors(req, async (req) => {
		try {
			if (req.method !== "POST")
				return Responses.methodNotAllowed()

			const body = await req.json()

			if (!isValidType(body)) {
				return Responses.badRequest({
					message: "User asset type is invalid.",
				})
			}

			const urlResult = await getUploadUrl({ dataProvider, userAssetsProvider }, body)
			const response: ResponseBody = { values: urlResult }

			return Responses.ok(response)
		} catch (e) {
			if (typeof e === "string") {
				return Responses.internalServerError({ message: e })
			} else {
				return Responses.internalServerError({ message: (e as Error).message })
			}
		}
	})
})
