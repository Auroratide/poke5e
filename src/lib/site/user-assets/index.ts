import { UserAssets } from "./UserAssets"
import { PUBLIC_USER_ASSETS_BASE_URL } from "$env/static/public"

export * from "./UserAssets"

export const userAssets = new UserAssets(PUBLIC_USER_ASSETS_BASE_URL)
