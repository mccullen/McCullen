import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";

@inject(DialogController)
export class GameSettings {
    public controller: DialogController
    constructor(controller: DialogController) {
        this.controller = controller;
    }
    public activate(model) {
    }
}