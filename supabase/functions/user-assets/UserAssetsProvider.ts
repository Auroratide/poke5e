import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export class UserAssetsProvider {
	constructor(
		private readonly s3: S3Client,
		private readonly bucket: string,
	) {
		if (!bucket) {
			throw new Error("Bucket name is required.")
		}
	}

	async generatePresignedUploadUrl(filename: string, contentType: string): Promise<string> {
		const expiresIn = 60 * 15 // 15 min

		try {
			const command = new PutObjectCommand({
				Bucket: this.bucket,
				Key: filename,
				ContentType: contentType,
			})

			const uploadUrl = await getSignedUrl(this.s3, command, {
				expiresIn,
			})

			return uploadUrl
		} catch (error) {
			throw new Error(`Failed to generate presigned upload URL: ${error instanceof Error ? error.message : String(error)}`);
		}
	}
}
