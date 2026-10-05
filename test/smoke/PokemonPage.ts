import { expect } from "@playwright/test"
import { Ui } from "./Ui"

export class PokemonPage {
	constructor(private readonly ui: Ui) {}

	async openPokemon(name: string) {
		await this.ui.link(name).click()
	}

	async searchFor(text: string) {
		await this.ui.textBox("Search").clear()
		await this.ui.textBox("Search").fill(text)
	}

	async openFilter() {
		await this.ui.button("Filter Options").click()
	}

	async closeFilter() {
		await this.ui.button("Close").first().click()
	}

	async selectType(value: string) {
		await this.ui.dropDown("Type").selectOption(value)
	}

	async selectSize(value: string) {
		await this.ui.dropDown("Size").selectOption(value)
	}

	async selectSr(value: string) {
		await this.ui.textBox("SR").fill(value)
	}

	async selectMinLevel(value: string) {
		await this.ui.textBox("Min Level").fill(value)
	}

	async selectEggGroup(value: string) {
		await this.ui.dropDown("Egg Group").selectOption(value)
	}

	async selectBiome(value: string) {
		await this.ui.dropDown("Biome").selectOption(value)
	}

	async selectNativeRegion(value: string) {
		await this.ui.dropDown("Native Region").selectOption(value)
	}

	async selectFoundIn(value: string) {
		await this.ui.dropDown("Found In").selectOption(value)
	}

	async resetFilters() {
		await this.ui.button("Reset Filters").click()
	}

	async expectPokemonInList(expectedNames: string[]) {
		const names = await this.ui.table("Pokémon List").locator("tbody tr a").allTextContents()

		expect(names).toEqual(
			expect.arrayContaining(expectedNames)
		)
	}

	async expectNumberOfPokemon(expectedNumberOfPokemon: number) {
		await expect(this.ui.output("Number of results")).toHaveText(new RegExp(`^\\s*${expectedNumberOfPokemon}\\s*/`))

		const table = this.ui.table("Pokémon List")
		await expect(table.locator("tbody tr")).toHaveCount(expectedNumberOfPokemon)
	}

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
