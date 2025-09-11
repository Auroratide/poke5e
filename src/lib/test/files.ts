export function stubImageFile(filename: string): File {
	return new File([], filename, {
		type: "image/png",
	})
}
