import { DialogController } from "aurelia-dialog";
import { autoinject, inject } from "aurelia-framework";
import { KeyValue } from "../../../core/KeyValue";

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

    public nRows: number;
    public nColumns: number;
    public showState: boolean = false;
    public showDepth: boolean = false;
    public playOptions: KeyValue<PlayOption, string>[] = [
        { key: PlayOption.HumanVsHuman, value: "Human versus Human" },
        { key: PlayOption.HumanVsComputer, value: "Human versus Computer" },
        { key: PlayOption.ComputerVsComputer, value: "Computer versus Computer" }
    ];
    public selectedPlayOption: KeyValue<PlayOption, string>;
    //public selectedPlayOption: any;
    //public playOptions: any;

    constructor(public controller: DialogController) {
        this.controller = controller;
    }
    public activate(model) {
    }
    public getSettings() {
        var test = this.selectedPlayOption;
        debugger;
        return {
            nRows: this.nRows,
            nColumns: this.nColumns,
            showState: this.showState,
            showDepth: this.showDepth,
            selectedPlayOption: test
        };
    }
}