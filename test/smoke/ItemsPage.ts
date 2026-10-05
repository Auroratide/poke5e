import { expect } from "@playwright/test"
import { ListPageBase } from "./ListPageBase"
import { Ui } from "./Ui"

export class ItemsPage extends ListPageBase {
	constructor(ui: Ui) {
		super(ui, "Item")
	}

	selectType = this.selectFromDropdown("Type")
	selectCost = this.selectFromText("Cost")

	async expectCorrectInfo(type: string, cost: string) {
		await expect(this.ui.descriptionDefinition("Type")).toHaveText(type)
		await expect(this.ui.descriptionDefinition("Cost")).toHaveText(cost)
	}

	async expectDamage(type: string, t1: string, t2: string, t3: string, t4: string) {
		await expect(this.ui.text(`${t1} + MOVE ${type} damage`)).toBeVisible()
		await expect(this.ui.text(`The damage dice roll for this move changes to ${t2} at level 5, ${t3} at level 10, and ${t4} at level 17.`)).toBeVisible()
	}

	async expectEvolutionPokemon(expectedSubset: string[]) {
		const listLocator = this.ui.page.locator("p").filter({ hasText: "Pokemon that evolve using this item" }).first().locator("xpath=following-sibling::ul")
		await expect(listLocator).toBeVisible()

		const list = await listLocator.locator("li").allTextContents()

		expect(list).toEqual(
			expect.arrayContaining(expectedSubset)
		)
	}
}
