export function capitalize(word: string): string {
	return word.charAt(0).toLocaleUpperCase() + word.slice(1)
}

export function capitalizeAll(sentence: string): string {
	return sentence.split(" ").map(capitalize).join(" ")
}

export function uppercase(word: string): string {
	return word.toLocaleUpperCase()
}

export function isUrl(str: string): boolean {
	return /^https?:\/\//.test(str)
}

export function isNotBlank(str: string | undefined | null): str is string {
	return str != null && str.trim() !== ""
}
