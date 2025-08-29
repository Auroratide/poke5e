import "@supabase/functions-js"
import { Responses } from "./Responses.ts"
import { DataProvider } from "./DataProvider.ts"

import { getUploadUrl, removeAsset, RemoveAssetParams, UploadUrlParams } from "./user-assets.ts"
import { initSupabase } from "./supabase.ts"
import { initS3 } from "./s3.ts"
import { UserAssetsProvider } from "./UserAssetsProvider.ts";
import { env } from "./env.ts"
import { handleCors } from "./cors.ts";

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
			if (typeof e === "string") {
				return Responses.internalServerError({ message: e })
			} else {
				return Responses.internalServerError({ message: (e as Error).message })
			}
		}
	})
})

export type PostRequestBody = UploadUrlParams
export type PostResponseBody = {
	values: {
		filename: string,
		uploadUrl: string,
	},
}

// deno-lint-ignore no-explicit-any
function isValidPostRequest(body: any): body is PostRequestBody {
	return body.type === "pokemon-avatar" && body.params?.sizeInBytes != null
}

const FIVE_HUNDRED_KB = 524288
function isValidFileSize(body: PostRequestBody): boolean {
	return body.params.sizeInBytes <= FIVE_HUNDRED_KB
}

async function POST(req: Request): Promise<Response> {
	const body = await req.json()

	if (!isValidPostRequest(body)) {
		return Responses.badRequest({
			message: "User asset type is invalid.",
		})
	}

	if (!isValidFileSize(body)) {
		return Responses.badRequest({
			message: `File size must be less than ${FIVE_HUNDRED_KB} bytes.`,
		})
	}

	const urlResult = await getUploadUrl({ dataProvider, userAssetsProvider }, body)
	const response: PostResponseBody = { values: urlResult }

	return Responses.ok(response)
}

export type DeleteRequestBody = RemoveAssetParams
// deno-lint-ignore no-explicit-any
function isValidDeleteRequest(body: any): body is DeleteRequestBody {
	return body.type === "pokemon-avatar"
}

async function DELETE(req: Request): Promise<Response> {
	const body = await req.json()

	if (!isValidDeleteRequest(body)) {
		return Responses.badRequest({
			message: "User asset type is invalid.",
		})
	}

	await removeAsset({ dataProvider, userAssetsProvider }, body)
	// note: supabase invoke always requires a body to parse
	return Responses.ok({})
}
