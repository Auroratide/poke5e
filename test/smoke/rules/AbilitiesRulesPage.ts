import { expect } from "@playwright/test"
import { Ui } from "../Ui"
import { BaseRulesPage } from "./BaseRulesPage"

export class AbilitiesRulesPage extends BaseRulesPage {
	static title = "Abilities"

	constructor(ui: Ui) {
		super(ui)
	}

	async filterFor(text: string) {
		await this.ui.textBox("Filter Abilities").clear()
		await this.ui.textBox("Filter Abilities").fill(text)
	}

	async expectNotAbility(text: string) {
		await expect(this.ui.heading(text)).not.toBeVisible()
	}

	async expectAbility(text: string) {
		await expect(this.ui.heading(text)).toBeVisible()
	}
}
