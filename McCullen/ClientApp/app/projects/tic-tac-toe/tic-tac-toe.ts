import { boardFactory } from "./boardFactory";
import { computerPlayerFactory } from "./computerPlayerFactory";
import { inject, autoinject } from "aurelia-framework";
import { DialogService } from "aurelia-dialog";
import { GameSettings, PlayOption } from "./game-settings";
import { Router } from "aurelia-router";
import { KeyValue } from "../../../core/KeyValue";


//@inject(boardFactory, computerPlayerFactory, DialogService, Router, BindingSignaler)
@autoinject()
export class TicTacToe {
    private board_: any;
    private computerPlayer_: any;


    public nRows: number;
    public nColumns: number;
    public showState: boolean = false;
    public showDepth: boolean = false;
    public gameSettings: any;
    public selectedPlayOption: KeyValue<PlayOption, string>;
    // Would it be better to inject a board object instead of the factory?
    constructor(boardFactory: any, computerPlayerFactory: any, public dialogService: DialogService, public router: Router) {
        //this.board_ = boardFactory
        this.dialogService = dialogService;
        this.router = router;
    }
    public activate() {
        this.dialogService.open({ viewModel: GameSettings })
            .whenClosed(response => {
                if (!response.wasCancelled) {
                    console.log(response.output);
                    this.nRows = response.output.nRows;
                    this.nColumns = response.output.nColumns;
                    this.showState = response.output.showState;
                    this.showDepth = response.output.showDepth;
                    this.selectedPlayOption = response.output.selectedPlayOption;
                    //this.router.navigate("#/projects/tic-tac-toe/", response.output);
                    //this.router.navigateToRoute("tic-tac-toe", response.output);
                }
            });
    }
}