import type { Page } from "@playwright/test"
import { Ui } from "./Ui"
import { FakemonPage } from "./FakemonPage"
import { TrainersPage } from "./TrainersPage"
import { PokemonPage } from "./PokemonPage"
import { MovesPage } from "./MovesPage"
import { TmsPage } from "./TmsPage"

export class Poke5eSite {
	static async startJourney(journeyName: string, page: Page): Promise<Poke5eSite> {
		console.log(`Starting Journey: ${journeyName}`)
		await page.goto("/")

		const ui = new Ui(page)
		return new Poke5eSite(ui)
	}

	constructor(private readonly ui: Ui) {}

	async navToPokemon(): Promise<PokemonPage> {
		await this.ui.nav("Pokémon").click()
		return new PokemonPage(this.ui)
	}

	async navToMoves(): Promise<MovesPage> {
		await this.ui.nav("Moves").click()
		return new MovesPage(this.ui)
	}

	async navToTms(): Promise<TmsPage> {
		await this.ui.nav("TMs").click()
		return new TmsPage(this.ui)
	}

	async navToFakemon(): Promise<FakemonPage> {
		await this.ui.link("Fakémon").click()
		return new FakemonPage(this.ui)
	}

	async navToTrainers(): Promise<TrainersPage> {
		await this.ui.link("Trainers").click()
		return new TrainersPage(this.ui)
	}
}