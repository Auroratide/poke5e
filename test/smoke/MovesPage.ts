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
}
