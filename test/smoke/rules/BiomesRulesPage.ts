import { expect } from "@playwright/test"
import { Ui } from "../Ui"
import { BaseRulesPage } from "./BaseRulesPage"

export class BiomesRulesPage extends BaseRulesPage {
	static title = "Biomes and Habitats"

	constructor(ui: Ui) {
		super(ui)
	}

	async openPokemonFor(biome: string) {
		await this.ui.details(`${biome} Pokémon`).click()
	}

	async expectPokemonForBiome(biome: string, expectedSubset: string[]) {
		const list = await this.ui.page
			.locator("summary")
			.filter({ hasText: `${biome} Pokémon` })
			.locator("xpath=following-sibling::ul")
			.locator("li")
			.allInnerTexts()
		
		expect(list).toEqual(
			expect.arrayContaining(expectedSubset)
		)
	}
}
