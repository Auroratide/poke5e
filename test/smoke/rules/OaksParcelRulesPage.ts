import { expect } from "@playwright/test"
import { Ui } from "../Ui"
import { BaseRulesPage } from "./BaseRulesPage"

export class OaksParcelRulesPage extends BaseRulesPage {
	static title = "Oak's Parcel One-Shot"

	constructor(ui: Ui) {
		super(ui)
	}

	async openStatBlock() {
		await this.ui.button("+ Show Details").first().click()
	}

	async expectMove(name: string) {
		await expect(this.ui.link(name)).toBeVisible()
	}
}

