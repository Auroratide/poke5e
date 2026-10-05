import { expect } from "@playwright/test"
import { Ui } from "../Ui"
import { BaseRulesPage } from "./BaseRulesPage"

export class RulesPage extends BaseRulesPage {
	constructor(ui: Ui) {
		super(ui)
	}

	async searchFor(text: string) {
		await this.ui.textBox("Search").clear()
		await this.ui.textBox("Search").fill(text)
	}

	async expectInList(expectedNames: string[]) {
		const links = await this.ui.page
			.getByRole("navigation", { name: "Rules" })
			.filter({ visible: true })
			.getByRole("link")
			.allInnerTexts()

		expect(links).toEqual(
			expect.arrayContaining(expectedNames)
		)
	}

	async expectNumberOfPages(expectedNumber: number) {
		await expect(this.ui.output("Number of results")).toHaveText(new RegExp(`^\\s*${expectedNumber}\\s*/`))
	}
}
