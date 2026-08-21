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
		await this.ui.link("+ Add Pokémon").click()
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
		await this.ui.button("Evolve").click()

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

	async expectTrainerBadge(trainerName: string) {
		console.log("  Checking the trainer badge...")

		// The badge's accessible name carries the level and path too, so match on
		// the trainer's name rather than the whole string.
		await expect(this.ui.link(new RegExp(trainerName))).toBeVisible()
		await expect(this.ui.link("Trainer List")).toBeVisible()
	}

	async openBox() {
		console.log("  Opening the box...")

		await expect(this.box).toBeHidden()
		await this.boxBar.click()

		await expect(this.boxBar).toHaveAttribute("aria-expanded", "true")
		await expect(this.box).toBeVisible()
	}

	async closeBoxWithEscape() {
		console.log("  Closing the box with Escape...")

		// Focus explicitly: confirming an action navigates, which drops focus back
		// to the body, and Escape is handled within the drawer rather than globally.
		await this.boxBar.focus()
		await this.ui.page.keyboard.press("Escape")

		await expect(this.boxBar).toHaveAttribute("aria-expanded", "false")
		await expect(this.box).toBeHidden()
		await expect(this.boxBar).toBeFocused()
	}

	/**
	 * The bar is named "Box <count>", which is the one thing that can be asserted
	 * while the drawer is shut and its contents are hidden.
	 */
	async expectBoxCount(count: number) {
		await expect(this.boxBar).toHaveAccessibleName(new RegExp(`Box\\s*${count}`))
	}

	async expectInBox(nickname: string) {
		await expect(this.boxBadge(nickname)).toBeVisible()
	}

	/**
	 * Deposits from the pokemon's own page. The move happens on the spot, so the
	 * page stays put and the button flips to its opposite.
	 */
	async deposit(nickname: string, expectedBoxCount: number) {
		console.log(`  Depositing ${nickname}...`)

		await this.ui.link(nickname).click()
		await this.storageAction("Deposit").click()

		await expect(this.storageAction("Withdraw")).toBeVisible()
		await this.expectBoxCount(expectedBoxCount)
	}

	async withdraw(nickname: string, expectedBoxCount: number) {
		console.log(`  Withdrawing ${nickname}...`)

		await this.box.getByRole("button", { name: `Withdraw ${nickname} from the Box` }).click()

		await this.expectBoxCount(expectedBoxCount)
		await expect(this.boxBadge(nickname)).toBeHidden()
	}

	async releaseFromBox(nickname: string, expectedBoxCount: number) {
		console.log(`  Releasing ${nickname} from the box...`)

		await this.box.getByRole("link", { name: `Release ${nickname}` }).click()
		await this.ui.button("Delete").click()

		await expect(this.ui.heading(this.currentTrainerName)).toBeVisible()
		await this.expectBoxCount(expectedBoxCount)
	}

	async filterBox(query: string, expectVisible: string, expectHidden: string) {
		console.log(`  Filtering the box by "${query}"...`)

		await this.box.getByLabel("Search the Box").fill(query)
		await expect(this.boxBadge(expectVisible)).toBeVisible()
		await expect(this.boxBadge(expectHidden)).toBeHidden()

		await this.box.getByLabel("Search the Box").fill("")
	}

	/**
	 * The pokemon page's own deposit/withdraw button. Scoped to the detail column,
	 * because a box row in the side column carries "Withdraw <name> from the Box".
	 */
	private storageAction(name: "Deposit" | "Withdraw") {
		return this.ui.page.locator("#main-content").getByRole("button", { name }).filter({ visible: true })
	}

	/**
	 * A pokemon's badge inside the box. Anchored to the start of the accessible
	 * name so it cannot also match the row's "Release <name>" link, which
	 * contains the nickname too.
	 */
	private boxBadge(nickname: string) {
		return this.box.getByRole("link", { name: new RegExp(`^${nickname}`) })
	}

	/**
	 * Everything inside the drawer is looked up through here, because the
	 * release control carries the nickname in its accessible name and would
	 * otherwise collide with the pokemon's own badge link.
	 */
	private get box() {
		return this.ui.region(/^Box/)
	}

	private get boxBar() {
		return this.ui.button(/^Box/)
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
