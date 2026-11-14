import { test, expect, vi, afterEach } from "vitest"
import { UserAssets, UserAssetsError } from "../UserAssets"
import { stubImageFile } from "$lib/test/files"

const UPLOAD_URL = "https://uploads.example.com/file.png?X-Amz-Signature=secret"

const networkError = () => new TypeError("Failed to fetch")
const response = (status: number, body = "") => new Response(body, { status })

const createUserAssets = (onRecovered = vi.fn()) => ({
	userAssets: new UserAssets("https://assets.example.com", {
		retryDelaysMs: [0, 0],
		onRecovered,
	}),
	onRecovered,
})

const stubFetch = (...results: (Response | Error)[]) => {
	const fetchSpy = vi.spyOn(globalThis, "fetch")
	results.forEach((result) => {
		if (result instanceof Error) {
			fetchSpy.mockRejectedValueOnce(result)
		} else {
			fetchSpy.mockResolvedValueOnce(result)
		}
	})

	return fetchSpy
}

afterEach(() => {
	vi.restoreAllMocks()
})

test("uploading succeeds on the first try without reporting a recovery", async () => {
	const fetchSpy = stubFetch(response(200))
	const { userAssets, onRecovered } = createUserAssets()

	await userAssets.upload(UPLOAD_URL, stubImageFile())

	expect(fetchSpy).toHaveBeenCalledTimes(1)
	expect(onRecovered).not.toHaveBeenCalled()
})

test("uploading retries after a network error and reports the recovery", async () => {
	const fetchSpy = stubFetch(networkError(), response(200))
	const { userAssets, onRecovered } = createUserAssets()

	await userAssets.upload(UPLOAD_URL, stubImageFile())

	expect(fetchSpy).toHaveBeenCalledTimes(2)
	expect(onRecovered).toHaveBeenCalledTimes(1)
	expect(onRecovered.mock.calls[0][0]).toContain("Attempts: 2")
	expect(onRecovered.mock.calls[0][0]).toContain("Host: uploads.example.com")
	expect(onRecovered.mock.calls[0][0]).not.toContain("secret")
})

test("uploading retries server errors and rate limiting", async () => {
	const fetchSpy = stubFetch(response(503), response(429), response(200))
	const { userAssets } = createUserAssets()

	await userAssets.upload(UPLOAD_URL, stubImageFile())

	expect(fetchSpy).toHaveBeenCalledTimes(3)
})

test("uploading gives up after the last retry", async () => {
	const fetchSpy = stubFetch(networkError(), networkError(), networkError())
	const { userAssets, onRecovered } = createUserAssets()

	const error = await userAssets.upload(UPLOAD_URL, stubImageFile()).catch((e) => e)

	expect(fetchSpy).toHaveBeenCalledTimes(3)
	expect(onRecovered).not.toHaveBeenCalled()
	expect(error).toBeInstanceOf(UserAssetsError)
	expect(error.message).toContain("did not complete")
	expect(error.details).toContain("Attempts: 3")
	expect(error.cause).toBeInstanceOf(TypeError)
})

test("uploading does not retry client errors", async () => {
	const fetchSpy = stubFetch(response(403, "SignatureDoesNotMatch"))
	const { userAssets } = createUserAssets()

	const error = await userAssets.upload(UPLOAD_URL, stubImageFile()).catch((e) => e)

	expect(fetchSpy).toHaveBeenCalledTimes(1)
	expect(error).toBeInstanceOf(UserAssetsError)
	expect(error.details).toContain("Status: 403")
	expect(error.details).toContain("Attempts: 1")
	expect(error.cause).toEqual("SignatureDoesNotMatch")
})

test("uploading reports the final status when server errors persist", async () => {
	stubFetch(response(500), response(502), response(503, "Service Unavailable"))
	const { userAssets } = createUserAssets()

	const error = await userAssets.upload(UPLOAD_URL, stubImageFile()).catch((e) => e)

	expect(error.details).toContain("Status: 503")
	expect(error.details).toContain("Attempts: 3")
	expect(error.cause).toEqual("Service Unavailable")
})
