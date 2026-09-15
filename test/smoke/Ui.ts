import type { Locator, Page } from "@playwright/test"

// Matches a label's whole text, so "Description" does not also match "Item Description".
const exactly = (text: string) =>
	new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`)

export class Ui {
	constructor(readonly page: Page) {}

	pause() {
		return this.page.pause()
	}

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

	// Temporary, until the textarea-markdown component can be fixed to properly
	// have the label point to the textbox. This is a bug in the component itself.
	markdownBox(label: string, within: Page | Locator = this.page) {
		return within.locator(".markdown-field")
			.filter({ has: this.page.locator("label").filter({ hasText: exactly(label) }) })
			.locator("textarea-markdown textarea")
			.filter({ visible: true })
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
