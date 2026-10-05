import { expect } from "@playwright/test"
import { Ui } from "./Ui"
import { ListPageBase } from "./ListPageBase"

export class PokemonPage extends ListPageBase {
	constructor(ui: Ui) {
		super(ui, "Pokémon")
	}

	selectType = this.selectFromDropdown("Type")
	selectSize = this.selectFromDropdown("Size")
	selectSr = this.selectFromText("SR")
	selectMinLevel = this.selectFromText("Min Level")
	selectEggGroup = this.selectFromDropdown("Egg Group")
	selectBiome = this.selectFromDropdown("Biome")
	selectNativeRegion = this.selectFromDropdown("Native Region")
	selectFoundIn = this.selectFromDropdown("Found In")

	async expectAbility(value: string) {
		await expect(this.ui.text(value)).toBeVisible()
	}

	async expectEvolvesTo(value: string) {
		await expect(this.ui.text(`can evolve into ${value}`)).toBeVisible()
	}

	async expectMoveList(listName: string, expectedNames: string[]) {
		const list = await this.ui.descriptionDefinition(listName).locator("li").allTextContents()

		expect(list).toEqual(
			expect.arrayContaining(expectedNames)
		)
	}

	async expectCorrectInfo(number: string, size: string, sr: string, eggGroup: string, minLevel: string) {
		await expect(this.ui.descriptionDefinition("Number")).toHaveText(number)
		await expect(this.ui.descriptionDefinition("Size")).toHaveText(size)
		await expect(this.ui.descriptionDefinition("SR")).toHaveText(sr)
		await expect(this.ui.descriptionDefinition("Egg Group")).toHaveText(eggGroup)
		await expect(this.ui.descriptionDefinition("Min Level")).toHaveText(minLevel)	
	}
}
