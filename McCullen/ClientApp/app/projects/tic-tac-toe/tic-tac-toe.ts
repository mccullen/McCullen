﻿import { boardFactory } from "./boardFactory";
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

    // Would it be better to inject a board object instead of the factory?
    constructor(
            public dialogService: DialogService,
            public router: Router) {
        this.dialogService = dialogService;
        this.router = router;
    }
    attached() {

        this.updateSquareDisplay();
    }
    public activate() {
        // Get settings from the user
        return this.dialogService.open({ viewModel: GameSettings })
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

                    //this.updateSquareDisplay();
                }
            });
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
        this.board.playPiece({row: row, column: column});

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
        //let squares = $("." + this.squareClass);
        //squares.prop({ disabled: false });
        this.activate().then((response) => {
            debugger;
            this.updateSquareDisplay();
        });
        //this.router.navigateToRoute("tic-tac-toe");
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
        $("." + this.squareClass).removeClass(this.stateClasses);

        if (this.showState) {
            let moveValues = this.computerPlayer.getMoveValues(this.board);
            for (let iMove = 0; iMove < moveValues.length; ++iMove) {
                let square = this.getSquare(moveValues[iMove].row, moveValues[iMove].column);

                if (this.showDepth) {
                    square.innerHTML = moveValues[iMove].depth;
                } else {
                    square.innerHTML = "";
                }

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
    public onSquareClick(row: number, column: number) {
        this.playPiece(row, column);

        let state = this.board.getState();
        if (this.selectedPlayOption.key === PlayOption.HumanVsComputer && state === this.board.state.unfinished) {
            // It is computer player's turn. Make his or her move.
            let bestMove = this.computerPlayer.getBestMove(this.board);
            this.playPiece(bestMove.row, bestMove.column);

            // Check the state of the board to see if the computer wins
            /*
            if (state === this.board.state.draw) {
                alert("draw");
            } else if (state !== this.board.state.unfinished) {
                alert("I win!");
            }
            */
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