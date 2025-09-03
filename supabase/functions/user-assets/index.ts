import "@supabase/functions-js"
import { Responses } from "./Responses.ts"
import { DataProvider } from "./DataProvider.ts"

import { getUploadUrl, removeAsset, UserAssetError } from "./user-assets.ts"
import { initSupabase } from "./supabase.ts"
import { initS3 } from "./s3.ts"
import { UserAssetsProvider } from "./UserAssetsProvider.ts"
import { env } from "./env.ts"
import { handleCors } from "./cors.ts"

const supabase = initSupabase()
const s3 = initS3()

const dataProvider = new DataProvider(supabase)
const userAssetsProvider = new UserAssetsProvider(s3, env.S3_BUCKET_NAME)

Deno.serve((req) => {
	return handleCors(req, async (req) => {
		try {
			if (req.method === "POST")
				return await POST(req)
			else if (req.method === "DELETE")
				return await DELETE(req)
			else
				return Responses.methodNotAllowed()
		} catch (e) {
			if (e instanceof UserAssetError) {
				return Responses.badRequest({
					message: e.message,
				})
			}

			if (typeof e === "string") {
				return Responses.internalServerError({ message: e })
			} else {
				return Responses.internalServerError({ message: (e as Error).message })
			}
		}
	})
})

async function POST(req: Request): Promise<Response> {
	const body = await req.json()
	const urlResult = await getUploadUrl({ dataProvider, userAssetsProvider }, body)
	const response = { values: urlResult }
	return Responses.ok(response)
}

async function DELETE(req: Request): Promise<Response> {
	const body = await req.json()
	await removeAsset({ dataProvider, userAssetsProvider }, body)

	// note: supabase invoke always requires a body to parse
	return Responses.ok({})
}
