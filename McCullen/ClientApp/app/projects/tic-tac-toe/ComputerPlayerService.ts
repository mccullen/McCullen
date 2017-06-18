﻿import { computerPlayerFactory } from "./computerPlayerFactory";
import { HttpClient, json} from 'aurelia-fetch-client';
import { inject, autoinject, bindable } from "aurelia-framework";
import * as $ from "jquery";

@autoinject()
export class ComputerPlayerService {
    constructor(public http: HttpClient) {
        this.http = http;
    }
    private boardToMoves = {};
    getMoveValues(board: any) {
        let promise = new Promise((resolve, reject) => {
            let moveValues;
            if (this.boardToMoves.hasOwnProperty(board)) {
                moveValues = this.boardToMoves[board];
                resolve(moveValues);
            } else {
                // Try to get the hashmap for this board from server
                let payload = {rows: board.getNumRows(), columns: board.getNumColumns() };
                $.post("/api/TicTacToe/GetBoardToMoves", payload)
                .then(data => {
                    if (data) {
                        $.extend(this.boardToMoves, data);
                        moveValues = this.boardToMoves[board];
                    } else {
                        let computerPlayer = computerPlayerFactory();
                        moveValues = computerPlayer.getMoveValues(board);
                        $.ajax({
                            method: "POST",
                            url: "/api/TicTacToe/SerializeBoardToMoves?rows=" + payload.rows + "&columns=" + payload.columns,
                            contentType: "application/json",
                            data: JSON.stringify(computerPlayer.getBoardToMoves())
                        });
                    }
                    resolve(moveValues);
                });

            }
        });
        return promise;
    }
}