import { DialogController } from "aurelia-dialog";
import { autoinject, inject } from "aurelia-framework";
import { KeyValue } from "../../resources/KeyValue";

export enum PlayOption {
    HumanVsHuman = 0,
    HumanVsComputer,
    ComputerVsComputer
}


@autoinject()
export class GameSettings {
    public readonly minRows: number = 0;
    public readonly minColumns: number = 0;
    public readonly maxRows: number = 3;
    public readonly maxColumns: number = 3;

    public nRows: number = this.maxRows;
    public nColumns: number = this.maxColumns;
    public showState: boolean = false;
    public showDepth: boolean = false;
    humanFirst: boolean = undefined;
    public playOptions: KeyValue<PlayOption, string>[] = [
        { key: PlayOption.HumanVsHuman, value: "Human versus Human" },
        { key: PlayOption.HumanVsComputer, value: "Human versus Computer" },
        { key: PlayOption.ComputerVsComputer, value: "Computer versus Computer" }
    ];
    public selectedPlayOption: KeyValue<PlayOption, string>;

    constructor(public controller: DialogController) {
        this.controller = controller;
    }
    public activate(model) {
    }
    public getSettings() {
        return {
            nRows: this.nRows,
            nColumns: this.nColumns,
            showState: this.showState,
            showDepth: this.showDepth,
            selectedPlayOption: this.selectedPlayOption,
            humanFirst: this.humanFirst
        };
    }
}