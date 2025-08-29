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
		sizeInBytes: number,
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

	const uploadUrl = await userAssetsProvider.generatePresignedUploadUrl(filename, params.mimetype, params.sizeInBytes)

	return {
		filename,
		uploadUrl,
	}
}

export type RemoveAssetParams = {
	type: "pokemon-avatar",
	params: {
		id: PokemonId,
		key: TrainerWriteKey,
	},
}

export async function removeAsset({
	dataProvider,
}: Providers, {
	params
}: RemoveAssetParams): Promise<void> {
	await dataProvider.removePokemonAvatar({
		id: params.id,
		key: params.key,
	})
}