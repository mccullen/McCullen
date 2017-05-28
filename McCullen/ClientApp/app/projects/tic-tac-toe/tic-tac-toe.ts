import { boardFactory } from "./boardFactory";
import { computerPlayerFactory } from "./computerPlayerFactory";
import { inject, autoinject, computedFrom } from "aurelia-framework";
import { DialogService } from "aurelia-dialog";
import { GameSettings, PlayOption } from "./game-settings";
import { Router } from "aurelia-router";
import { KeyValue } from "../../resources/KeyValue";
import * as $ from "jquery";

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
    constructor(
            public dialogService: DialogService,
            public router: Router) {
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

                }
            });
    }
    playPiece(row: number, column: number) {
        // Disable square of the move just played
        let square = document.getElementById(this.getSquareId(row, column)) as HTMLButtonElement;
        square.disabled = true;

        // Place piece
        square.innerHTML = this.board.getCurrentPlayer();
        this.board.playPiece({row: row, column: column});
    }
    public onSquareClick(row: number, column: number) {
        this.playPiece(row, column);

        if (this.selectedPlayOption.key === PlayOption.HumanVsComputer) {
            // It is computer player's turn. Make his or her move.
            let bestMove = this.computerPlayer.getBestMove(this.board);
            this.playPiece(bestMove.row, bestMove.column);

            // Check the state of the board to see if the computer wins
            let state = this.board.getState();
            if (state === this.board.state.draw) {
                alert("draw");
            } else if (state !== this.board.state.unfinished) {
                alert("I win!");
            }
        }
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
    private getSquareId(row: number, column: number) {
        return "sq" + "-" + row + "-" + column;
    }
    onShowStateChange() {
        return true;
    }
    getStateClass(row, column) {
        debugger;
        let stateClass = "";
        if (this.showState === true) {
            stateClass = "win";
        } else {
            stateClass = "lose";
        }
        return stateClass;
    }
}