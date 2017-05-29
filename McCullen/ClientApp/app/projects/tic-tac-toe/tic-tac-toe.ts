import { boardFactory } from "./boardFactory";
import { computerPlayerFactory } from "./computerPlayerFactory";
import { inject, autoinject, bindable } from "aurelia-framework";
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
    @bindable
    public showState: boolean;
    @bindable
    public showDepth: boolean;
    public gameSettings: any;
    public selectedPlayOption: KeyValue<PlayOption, string>;
    humanFirst: boolean;
    currentPlayer: string;

    // Would it be better to inject a board object instead of the factory?
    constructor(
            public dialogService: DialogService,
            public router: Router) {
        this.dialogService = dialogService;
        this.router = router;
    }
    attached() {

        this.updateSquareDisplay();
        if (this.selectedPlayOption.key === PlayOption.HumanVsComputer && !this.humanFirst) {
            this.makeComputerPlayerMove();
        }
        if (this.selectedPlayOption.key === PlayOption.ComputerVsComputer) {
            $("." + this.squareClass).prop({ disabled: true });
            while (this.board.getState() === this.board.state.unfinished) {
                this.makeComputerPlayerMove();
            }
        }
    }
    getGameSettings() {

    }
    public canActivate() {
        // Get settings from the user
        let promise = new Promise<boolean>((resolve, reject) => {
            this.dialogService.open({ viewModel: GameSettings })
                .whenClosed(response => {
                    if (!response.wasCancelled) {
                        this.nRows = response.output.nRows;
                        this.nColumns = response.output.nColumns;
                        this.showState = response.output.showState;
                        this.showDepth = response.output.showDepth;
                        this.selectedPlayOption = response.output.selectedPlayOption;
                        this.humanFirst = response.output.humanFirst;
                        this.board = boardFactory({ numRows: this.nRows, numColumns: this.nColumns });
                        this.currentPlayer = this.board.getCurrentPlayer();
                        this.computerPlayer = computerPlayerFactory();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
        });
        return promise;
    }
    private readonly winClass: string = "win";
    private readonly loseClass: string = "lose";
    private readonly tieClass: string = "tie";
    playPiece(row: number, column: number) {

        // Disable square of the move just played
        let square = document.getElementById(this.getSquareId(row, column)) as HTMLButtonElement;
        square.disabled = true;

        // Place piece
        square.innerHTML = this.board.getCurrentPlayer();
        $(square).fadeIn(3000);
        this.board.playPiece({ row: row, column: column });
        this.currentPlayer = this.board.getCurrentPlayer();

        let state = this.board.getState();
        if (state !== this.board.state.unfinished) {
            $("." + this.squareClass).prop({ disabled: true });
            if (state === this.board.state.xWon) {
                setTimeout(() => { alert("x won"); }, 1);
            } else if (state === this.board.state.oWon) {
                setTimeout(() => { alert("o won"); }, 1);
            } else if (state === this.board.state.draw) {
                setTimeout(() => { alert("tie"); }, 1);
            }
        }


        // Remove state color indication classes and depth numbers and update the non-empty squares
        $(square).removeClass(this.stateClasses);
        this.updateSquareDisplay();
    }
    onReset() {

        // Reactivate page and update the squares with selected options
        this.canActivate().then((response) => {
            //this.updateSquareDisplay();
            //debugger;
            if (response) {
                // Enable all the squares
                let squares = $("." + this.squareClass);
                squares.prop({ disabled: false });
                this.attached();
            }
        });
    }
    private get stateClasses() {
        return this.winClass + " " + this.loseClass + " " + this.tieClass;
    }
    private currentPlayerWins(state) {
        let currentPlayer = this.board.getCurrentPlayer();
        return (currentPlayer === this.board.piece.x && state === this.board.state.xWon) ||
            (currentPlayer === this.board.piece.o && state === this.board.state.oWon);
    }
    private readonly squareClass = "square";
    private updateSquareDisplay() {
        // Remove classes that indicate the state of the square so you can update it
        $("." + this.squareClass).removeClass(this.stateClasses);

        // Get the depth and state information of all empty squares
        let moveValues = this.computerPlayer.getMoveValues(this.board);

        // Update the display of each non-empty square
        for (let iMove = 0; iMove < moveValues.length; ++iMove) {
            let square = this.getSquare(moveValues[iMove].row, moveValues[iMove].column);

            if (this.showDepth) {
                // Show depth checked. Show depth information
                square.innerHTML = moveValues[iMove].depth;
            } else {
                square.innerHTML = "";
            }

            if (this.showState) {
                // Show state checked. Show state information
                if (moveValues[iMove].state === this.board.state.draw) {
                    $(square).addClass(this.tieClass);
                } else if (this.currentPlayerWins(moveValues[iMove].state)) {
                    $(square).addClass(this.winClass);
                } else {
                    $(square).addClass(this.loseClass);
                }
            }
        }
    }
    makeComputerPlayerMove() {
        let bestMove = this.computerPlayer.getBestMove(this.board);
        this.playPiece(bestMove.row, bestMove.column);
    }
    public onSquareClick(row: number, column: number) {
        this.playPiece(row, column);

        let state = this.board.getState();
        if (this.selectedPlayOption.key === PlayOption.HumanVsComputer && state === this.board.state.unfinished) {
            // It is computer player's turn. Make his or her move.
            this.makeComputerPlayerMove();
        }
    }
    private getSquareId(row: number, column: number) {
        return "sq" + "-" + row + "-" + column;
    }
    private getSquare(row: number, column: number): HTMLElement {
        let squareId = this.getSquareId(row, column);
        return document.getElementById(squareId) as HTMLElement;
    }
    showStateChanged(oldValue: boolean, newValue: boolean) {
        this.updateSquareDisplay();
    }
    showDepthChanged(oldValue: boolean, newValue: boolean) {
        this.updateSquareDisplay();
    }
}