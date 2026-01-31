import { expect } from "@playwright/test"
import { Ui } from "./Ui"

export class FakemonPage {
	constructor(private readonly ui: Ui) {}

	async createFakemon(fakemonName: string) {
		console.log(`  Creating Fakemon ${fakemonName}...`)

		await this.ui.link("New Fakémon").click()
		await this.ui.textBox("Species Name").fill(fakemonName)
		await this.ui.dropDown("Primary Type").selectOption("water")
		await this.ui.dropDown("Secondary Type").selectOption("grass")
		await this.ui.button("Finish!").click()

		await expect(this.ui.heading(fakemonName)).toBeVisible()

		const id = await this.ui.descriptionDefinition("ID").textContent()

		console.log(`  (read key is ${id})`)
	}

	async editFakemon() {
		console.log(`  Editing Fakemon...`)

		await this.ui.link("Edit").click()
		await this.ui.textBox("Min Level").fill("5")
		await this.ui.textBox("Description").fill("The Automated Test Pokemon. This pokemon was generated to test that the website still works correctly.")
		await this.ui.radio("50% ♀ : 50% ♂").check()
		await this.ui.checkbox("Athletics").check()
		await this.ui.checkbox("Intelligence").check()
		await this.ui.formGroup("Non-Hidden Abilities").getByLabel("Add Ability").selectOption("aftermath")

		await this.ui.formGroup("Starting Moves")
			.getByText("Add Moves")
			.click()
		await this.ui.textBox("Find Move to Add").fill("power")
		await this.ui.text("Hidden Power")
			.locator("..")
			.getByRole("button", { name: /add/i })
			.click()
		
		await this.ui.button("Finish!").click()

		await expect(this.ui.text(/The Automated Test Pokemon/)).toBeVisible()
		expect(await this.ui.descriptionDefinition("Proficiencies").textContent()).toEqual("athletics")
		expect(await this.ui.descriptionDefinition("Saving Throws").textContent()).toEqual("int")
		await expect(this.ui.text("Aftermath")).toBeVisible()
		await expect(this.ui.text("Hidden Power")).toBeVisible()
	}
}
