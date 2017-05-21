import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";

enum Mode {
    HumanVsHuman,
    HumanVsComputer,
    ComputerVsComputer
}

class PlayOption {
    public mode: Mode;
    public name: string;
}

@inject(DialogController)
export class GameSettings {
    public readonly minRows: number = 0;
    public readonly minColumns: number = 0;
    public readonly maxRows: number = 3;
    public readonly maxColumns: number = 3;

    public nRows: number;
    public nColumns: number;
    public showState: boolean = false;
    public showDepth: boolean = false;
    public playOptions: PlayOption[] = [
        { mode: Mode.HumanVsHuman, name: "Human versus Human" },
        { mode: Mode.HumanVsComputer, name: "Human versus Computer" },
        { mode: Mode.ComputerVsComputer, name: "Computer versus Computer" }
    ];
    public selectedPlayOption: PlayOption;

    public controller: DialogController;
    constructor(controller: DialogController) {
        this.controller = controller;
    }
    public activate(model) {
    }
}