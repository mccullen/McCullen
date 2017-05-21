import { boardFactory } from "./boardFactory";
import { computerPlayerFactory } from "./computerPlayerFactory";
import { inject } from "aurelia-framework";

enum PlayOption {
    HumanVsHuman,
    HumanVsComputer,
    ComputerVsComputer
}

@inject(boardFactory, computerPlayerFactory)
export class TicTacToe {
    private board_: any;
    private computerPlayer_: any;

    public rowOptions: number[] = [1, 2, 3];
    public nRows: number;
    public columnOptions: number[] = [1, 2, 3];
    public nColumns: number;
    public showState: boolean = false;
    public showDepth: boolean = false;
    public playOption: PlayOption;
    constructor(boardFactory: any, computerPlayerFactory: any) {
        //this.board_ = boardFactory
    }
}