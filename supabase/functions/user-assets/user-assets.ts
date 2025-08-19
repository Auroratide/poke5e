import { DataProvider, PokemonId, TrainerWriteKey } from "./DataProvider.ts"
import { UserAssetsProvider } from "./UserAssetsProvider.ts"

const MimetypeExtensions = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
} as const

export type Providers = {
	dataProvider: DataProvider,
	userAssetsProvider: UserAssetsProvider,
}

export type UploadUrlParams = {
	type: "pokemon-avatar",
	params: {
		id: PokemonId,
		key: TrainerWriteKey,
		mimetype: keyof typeof MimetypeExtensions,
	},
}

export type UploadUrlResult = {
	filename: string,
	uploadUrl: string,
}

export async function getUploadUrl({
	dataProvider,
	userAssetsProvider,
}: Providers, {
	params,
}: UploadUrlParams): Promise<UploadUrlResult> {
	const filename = await dataProvider.newPokemonAvatarFilename({
		id: params.id,
		key: params.key,
		extension: MimetypeExtensions[params.mimetype],
	})

	const uploadUrl = await userAssetsProvider.generatePresignedUploadUrl(filename, params.mimetype)

	return {
		filename,
		uploadUrl,
	}
}