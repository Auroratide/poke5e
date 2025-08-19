import { S3Client } from "@aws-sdk/client-s3"
import { env } from "./env.ts"

export function initS3(): S3Client {
	const endpoint = env.S3_ENDPOINT
	const accessKeyId = env.S3_ACCESS_KEY_ID
	const secretAccessKey = env.S3_SECRET_ACCESS_KEY
	const region = "auto"

	if (!endpoint || !accessKeyId || !secretAccessKey) {
		throw new Error("Missing S3 credentials.")
	}

	return new S3Client({
		region,
		endpoint,
		// endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId,
			secretAccessKey,
		},
	})
}
