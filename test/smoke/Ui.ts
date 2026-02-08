import type { Page } from "@playwright/test"

export class Ui {
	constructor(readonly page: Page) {}

	text(text: string | RegExp) {
		return this.page.getByText(text).filter({ visible: true })
	}

	link(name: string | RegExp) {
		return this.page.getByRole("link", { name }).filter({ visible: true })
	}

	button(name: string | RegExp) {
		return this.page.getByRole("button", { name }).filter({ visible: true })
	}

	textBox(label: string | RegExp) {
		return this.page.getByLabel(label).filter({ visible: true })
	}

	fieldset(name: string) {
		return this.page.locator(`fieldset:has-text("${name}")`).filter({ visible: true })
	}

	formGroup(name: string) {
		return this.page.locator(`.form-group:has-text("${name}")`).filter({ visible: true })
	}

	dropDown(label: string | RegExp) {
		return this.page.getByLabel(label).filter({ visible: true })
	}

	radio(label: string | RegExp) {
		return this.page.getByLabel(label, { exact: true }).filter({ visible: true })
	}

	range(label: string | RegExp) {
		return this.page.getByLabel(label).filter({ visible: true })
	}

	checkbox(label: string | RegExp) {
		return this.page.getByLabel(label).filter({ visible: true })
	}

	heading(name: string | RegExp) {
		return this.page.getByRole("heading", { name, exact: true }).filter({ visible: true })
	}

	descriptionDefinition(title: string) {
		return this.page.locator(`dt:has-text("${title}") + dd`).filter({ visible: true })
	}
}
