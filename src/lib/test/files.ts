export function stubImageFile(filename: string = "a.png"): File {
	return new File([new Uint8Array([137, 80, 78, 71])], filename, {
		type: "image/png",
	})
}
