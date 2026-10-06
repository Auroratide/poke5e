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
		await this.ui.dropDown("Hit Dice").selectOption("d8")
		await this.ui.dropDown("Size").selectOption("tiny")
		await this.ui.dropDown("SR").selectOption("2")
		await this.ui.markdownBox("Description").fill("The Automated Test Pokemon. This pokemon was generated to test that the website still works correctly.")

		await this.ui.textBox("AC").fill("13")
		await this.ui.textBox("HP").fill("30")
		await this.ui.textBox("STR").fill("15")
		await this.ui.textBox("DEX").fill("9")
		await this.ui.textBox("CON").fill("16")
		await this.ui.textBox("INT").fill("6")
		await this.ui.textBox("WIS").fill("13")
		await this.ui.textBox("CHA").fill("13")

		await this.ui.radio("75% ♀ : 25% ♂").check()

		await this.ui.checkbox("Undiscovered").uncheck()
		await this.ui.checkbox("Monster").check()

		await this.ui.textBox("walking").fill("40")
		await this.ui.textBox("blindsight").fill("40")

		await this.ui.checkbox("athletics").check()
		await this.ui.checkbox("Intelligence").check()

		await this.ui.formGroup("Non-Hidden Abilities").getByRole("button", { name: "Add Ability" }).click()
		await this.ui.formGroup("Non-Hidden Abilities").getByLabel("Ability").selectOption("aftermath")

		await this.ui.formGroup("Non-Hidden Abilities").getByRole("button", { name: "Add Custom Ability" }).click()
		await this.ui.formGroup("Non-Hidden Abilities").getByLabel("Name").fill("Evosmite")
		await this.ui.markdownBox("Description", this.ui.formGroup("Non-Hidden Abilities")).fill("Deals +3 dmg to evolved pokemon.")

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

	async createFakemonEvolutionFor(fakemonName: string) {
		const evolvedName = `Evolved ${fakemonName}`
		await this.createFakemon(evolvedName)

		await this.ui.link("Edit").click()
		await this.ui.tab("Evolves From...").click()
		await this.ui.button("Add Evolution").click()
		await this.ui.textBox("Evolves From...").fill(fakemonName)
		await this.ui.button(fakemonName).click()

		await this.ui.button("Finish!").click()

		await expect(this.ui.text(`${fakemonName} can evolve into ${evolvedName} at level 8 or above`)).toBeVisible()
	}
}
