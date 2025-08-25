export class UserAssets {
	constructor(private readonly baseUrl: string) {}

	getAssetUrl(name: string): string {
		return `${this.baseUrl}/${name}`
	}
}
