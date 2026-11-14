import { UserAssets } from "./UserAssets"
import { PUBLIC_USER_ASSETS_BASE_URL } from "$env/static/public"
import { ErrorsDb } from "$lib/site/errors/ErrorsDb"

export * from "./UserAssets"

export const userAssets = new UserAssets(PUBLIC_USER_ASSETS_BASE_URL, {
	// Not an error the user sees, but recorded to learn how often retrying helps
	onRecovered: (details) => {
		ErrorsDb.report("UserAssets.upload.recovered", `Upload succeeded after retrying; ${details}`)
	},
})
