import { expect } from "@playwright/test"
import { ListPageBase } from "./ListPageBase"
import { Ui } from "./Ui"

export class MovesPage extends ListPageBase {
	constructor(ui: Ui) {
		super(ui, "Move")
	}

	selectType = this.selectFromDropdown("Type")
	selectMovePower = this.selectFromDropdown("Move Power")
	selectMoveTime = this.selectFromDropdown("Move Time")
	selectContest = this.selectFromDropdown("Contest")
	selectRange = this.selectFromText("Range")
	selectPP = this.selectFromText("PP")

	async expectCorrectInfo(movePower: string, moveTime: string, pp: string, duration: string, range: string) {
		await expect(this.ui.descriptionDefinition("Move Power")).toHaveText(movePower)
		await expect(this.ui.descriptionDefinition("Move Time")).toHaveText(moveTime)
		await expect(this.ui.descriptionDefinition("PP").first()).toHaveText(pp)
		await expect(this.ui.descriptionDefinition("Duration")).toHaveText(duration)
		await expect(this.ui.descriptionDefinition("Range")).toHaveText(range)	
	}

	async expectDamage(type: string, t1: string, t2: string, t3: string, t4: string) {
		await expect(this.ui.text(`${t1} + MOVE ${type} damage`)).toBeVisible()
		await expect(this.ui.text(`The damage dice roll for this move changes to ${t2} at level 5, ${t3} at level 10, and ${t4} at level 17.`)).toBeVisible()
	}

	async expectsLearnsBy(method: string, expectedSubset: string[]) {
		// Locate the h2 containing the text, then select the following sibling ul
		const listOfLearners = await this.ui.page.locator("h2").filter({ hasText: `Learns by ${method}` }).locator("xpath=following-sibling::ul").locator("li").allTextContents()

		expect(listOfLearners).toEqual(
			expect.arrayContaining(expectedSubset)
		)
	}
}
