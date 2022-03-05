import { InjectReactApp } from "./InjectReactApp";
import { PreparePage } from "./PreparePage";

class ActionsHistoryPage {
	constructor() {
		this.Init();
	}

	private async Init() {
		await PreparePage();
		await InjectReactApp();

		document.body.classList.add("brainlyMentor");
	}
}

new ActionsHistoryPage();