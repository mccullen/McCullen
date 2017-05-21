import { DialogService } from "aurelia-dialog";
import { inject } from "aurelia-framework";
import { GameSettings } from "./tic-tac-toe/game-settings";

@inject(DialogService)
export class Index {
    public dialogService: DialogService;

    constructor(dialogService: DialogService) {
        this.dialogService = dialogService;
    }

    submit() {
        this.dialogService.open({ viewModel: GameSettings, model: "jeffrey", lock: false });
    }
}