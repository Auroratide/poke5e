export function capitalize(word: string): string {
	return word.charAt(0).toLocaleUpperCase() + word.slice(1)
}

export function capitalizeAll(sentence: string): string {
	return sentence.split(" ").map(capitalize).join(" ")
}
