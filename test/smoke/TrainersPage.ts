import { expect } from "@playwright/test"
import { Ui } from "./Ui"

export class TrainersPage {
	private currentTrainerName: string = ""

	constructor(private readonly ui: Ui) {}

	async createTrainer(trainerName: string) {
		console.log(`  Creating ${trainerName}...`)

		await this.ui.link("New Trainer").click()
		await this.ui.textBox("Name").fill(trainerName)
		await this.ui.button("Finish!").click()

		await expect(this.ui.heading(trainerName)).toBeVisible()

		const id = await this.ui.descriptionDefinition("Trainer Id").textContent()

		console.log(`  (read key is ${id})`)

		this.currentTrainerName = trainerName

		return id ?? ""
	}

	async editTrainer() {
		console.log(`  Editing Trainer...`)

		await this.ui.link("Edit").click()
		await this.ui.textBox("Level").fill("5")
		await this.ui.dropDown("Path Name").selectOption("Ace Trainer")
		await this.ui.range("Kindler (fire)").fill("1")
		await this.ui.textBox("Home Region").fill("Kanto")
		await this.ui.textBox("Money").fill("1000")

		await this.addStandardItem("Great Ball")
		await this.addCustomItem("Lustergem", "A very powerful gem.")

		await this.ui.button("Finish!").click()

		await expect(this.ui.text("Battle Master")).toBeVisible()
		await expect(this.ui.text("Kindler ×1")).toBeVisible()
		expect(await this.ui.descriptionDefinition("Home Region").textContent()).toEqual("Kanto")
		expect(await this.ui.textBox("Money").inputValue()).toEqual("1000")
		await expect(this.ui.text("Great Ball")).toBeVisible()
		await expect(this.ui.text("Lustergem")).toBeVisible()
	}

	async addPokemon(species: string) {
		console.log(`  Adding ${species}...`)
		const searchQuery = species.toLocaleLowerCase().substring(0, 4)
		await this.ui.link("Add Pokemon").click()
		await this.ui.textBox("Species").fill(searchQuery)
		await this.ui.button(species).click()

		await expect(this.ui.heading(species)).toBeVisible()
	}

	async expectType(primary: string, secondary?: string) {
		await expect(this.ui.text(primary).first()).toBeVisible()
		if (secondary) {
			await expect(this.ui.text(secondary).first()).toBeVisible()
		}
	}

	async editPokemon(nickname: string) {
		console.log(`  Editing ${nickname}...`)

		await this.ui.link("Edit").click()
		await this.ui.textBox("Nickname").fill(nickname)
		await this.ui.dropDown("Nature").first().selectOption("Serious")
		await this.ui.radio("male").check()
		await this.addMove("ember")
		await this.addStandardItem("Sitrus Berry")

		await this.ui.button("Finish!").click()
		
		await expect(this.ui.heading(nickname)).toBeVisible()
		await expect(this.ui.text("Ember").first()).toBeVisible()
		await expect(this.ui.text("Sitrus Berry")).toBeVisible()
	}

	async evolve(nickname: string, into: string) {
		console.log(`  Evolving into ${into}...`)

		await this.ui.link(nickname).click()
		await this.ui.link("Evolve").click()
		await this.ui.radio(into).check()
		await this.ui.button("Evolve!").click()

		await expect(this.ui.heading(nickname)).toBeVisible()
		await expect(this.ui.text(into)).toBeVisible()
	}

	async removePokemon(nickname: string) {
		console.log("  Removing pokemon...")
		await this.ui.link(nickname).click()
		await this.ui.link("Remove").click()
		await this.ui.button("Delete").click()

		await expect(this.ui.heading(this.currentTrainerName)).toBeVisible()
		await expect(this.ui.page.getByRole("listitem", { name: nickname })).not.toBeVisible()
	}

	async removeTrainer(readKey: string) {
		console.log("  Removing trainer...")

		
		await this.ui.page.goto(`/trainers?id=${readKey}&action=retire-trainer`)
		await this.ui.button("Delete").click()

		await expect(this.ui.heading("Trainer List")).toBeVisible()
	}
	
	private async addStandardItem(item: string) {
		await this.ui.button("Add Item").click()
		await this.ui.dropDown("Item").selectOption(item)
	}

	private async addCustomItem(name: string, description: string) {
		await this.ui.button("Add Custom Item").click()
		await this.ui.fieldset("Inventory")
			.getByLabel("Name")
			.fill(name)
		await this.ui.fieldset("Inventory")
			.getByLabel("Item Description")
			.fill(description)
	}

	private async addMove(name: string) {
		await this.ui.button("Add Move").click()
		await this.ui.dropDown("Move").selectOption(name)
	}
}
