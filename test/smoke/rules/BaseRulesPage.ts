import { Ui } from "../Ui"

type RulesPageClass<P extends BaseRulesPage> = {
	new (ui: Ui): P
	title: string
}

export class BaseRulesPage {
	constructor(protected readonly ui: Ui) {}

	async open<P extends BaseRulesPage>(Page: RulesPageClass<P>): Promise<P> {
		await this.ui.link(Page.title).click()

		return new Page(this.ui)
	}
}
