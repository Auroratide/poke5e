export function kebab(str: string): string {
	return str.toLocaleLowerCase().replaceAll(/\s/g, "-")
}
