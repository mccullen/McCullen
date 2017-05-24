import { boardFactory } from "./boardFactory";
import { computerPlayerFactory } from "./computerPlayerFactory";
import { inject, autoinject } from "aurelia-framework";
import { DialogService } from "aurelia-dialog";
import { GameSettings, PlayOption } from "./game-settings";
import { Router } from "aurelia-router";
import { KeyValue } from "../../resources/KeyValue";


//@inject(boardFactory, computerPlayerFactory, DialogService, Router, BindingSignaler)
@autoinject()
export class TicTacToe {
    private board: any;
    private computerPlayer: any;


    public nRows: number;
    public nColumns: number;
    public showState: boolean;
    public showDepth: boolean;
    public gameSettings: any;
    public selectedPlayOption: KeyValue<PlayOption, string>;

    // Would it be better to inject a board object instead of the factory?
    constructor(boardFactory: any, computerPlayerFactory: any, public dialogService: DialogService, public router: Router) {
        //this.board_ = boardFactory
        this.dialogService = dialogService;
        this.router = router;
    }
    public activate() {
        // Get settings from the user
        this.dialogService.open({ viewModel: GameSettings })
            .whenClosed(response => {
                if (!response.wasCancelled) {
                    console.log(response.output);
                    this.nRows = response.output.nRows;
                    this.nColumns = response.output.nColumns;
                    this.showState = response.output.showState;
                    this.showDepth = response.output.showDepth;
                    this.selectedPlayOption = response.output.selectedPlayOption;

                    this.board = boardFactory({numRows: this.nRows, numColumns: this.nColumns});
                    this.computerPlayer = computerPlayerFactory();

                    this.play();
                }
            });
    }
    public playPiece(row: number, column: number) {
        debugger;
    }
    private play() {
        if (this.selectedPlayOption.key === PlayOption.HumanVsHuman) {

            console.log("hvh");
        } else if (this.selectedPlayOption.key === PlayOption.HumanVsComputer) {

            console.log("hvc");
        } else {

            console.log("cvc");
        }
    }
}