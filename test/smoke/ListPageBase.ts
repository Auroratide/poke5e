import { expect } from "@playwright/test"
import { Ui } from "./Ui"

export class ListPageBase {
	constructor(protected readonly ui: Ui, private readonly name: string) {}

	async open(name: string) {
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

	selectFromDropdown = (label: string) => (value: string) =>
		this.ui.dropDown(label).selectOption(value)

	selectFromText = (label: string) => (value: string) =>
		this.ui.textBox(label).fill(value)

	async resetFilters() {
		await this.ui.button("Reset Filters", { inexact: true }).click()
	}

	async expectInList(expectedNames: string[]) {
		const names = await this.ui.table(`${this.name} List`).locator("tbody tr a").allTextContents()

		expect(names).toEqual(
			expect.arrayContaining(expectedNames)
		)
	}

	async expectNumberOfItems(expectedNumber: number) {
		await expect(this.ui.output("Number of results")).toHaveText(new RegExp(`^\\s*${expectedNumber}\\s*/`))

		const table = this.ui.table(`${this.name} List`)
		await expect(table.locator("tbody tr")).toHaveCount(expectedNumber)
	}
}
