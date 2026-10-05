import { expect } from "@playwright/test"
import { Ui } from "./Ui"

export class MovesPage {
	constructor(private readonly ui: Ui) {}

	async openMove(name: string) {
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

	async selectMovePower(value: string) {
		await this.ui.dropDown("Move Power").selectOption(value)
	}

	async selectMoveTime(value: string) {
		await this.ui.dropDown("Move Time").selectOption(value)
	}

	async selectContest(value: string) {
		await this.ui.dropDown("Contest").selectOption(value)
	}

	async selectRange(value: string) {
		await this.ui.textBox("Range").fill(value)
	}

	async selectPP(value: string) {
		await this.ui.textBox("PP").fill(value)
	}

	async resetFilters() {
		await this.ui.button("Reset Filters").click()
	}

	async expectMovesInList(expectedNames: string[]) {
		const names = await this.ui.table("Move List").locator("tbody tr a").allTextContents()

		expect(names).toEqual(
			expect.arrayContaining(expectedNames)
		)
	}

	async expectNumberOfMoves(expectedNumber: number) {
		await expect(this.ui.output("Number of results")).toHaveText(new RegExp(`^\\s*${expectedNumber}\\s*/`))

		const table = this.ui.table("Move List")
		await expect(table.locator("tbody tr")).toHaveCount(expectedNumber)
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
