import { computerPlayerFactory } from "./computerPlayerFactory";
import { inject, autoinject, bindable } from "aurelia-framework";
import * as $ from "jquery";

@autoinject()
export class ComputerPlayerService {
    // The hashmap of boards to the information about that board state.
    private boardToMoves = {};

    // Given any board state, return the best possible move for the current player.
    getBestMove(board: any) {
        let computerPlayer = computerPlayerFactory();
        computerPlayer.setBoardToMoves(this.boardToMoves);
        let bestMove = computerPlayer.getBestMove(board);
        return bestMove;
    }
    // Given any board state, get a promise of the end-state and depth info about every possible move.
    getMoveValues(board: any) {
        let promise = new Promise((resolve, reject) => {
            let moveValues;
            if (this.boardToMoves.hasOwnProperty(board)) {
                // Board is in hashmap, resolve with the move values
                moveValues = this.boardToMoves[board];
                resolve(moveValues);
            } else {
                // Board is not in hashmap.
                // Try to get the hashmap for this board from server.
                let payload = {rows: board.getNumRows(), columns: board.getNumColumns() };
                $.post("/api/TicTacToe/GetBoardToMoves", payload)
                .then(data => {
                    if (data) {
                        // Hashmap was on the server, extend boardToMoves with the
                        // retrieved values.
                        $.extend(this.boardToMoves, data);
                        moveValues = this.boardToMoves[board];
                    } else {
                        // Hashmap was not on server so calculate on the client.
                        let computerPlayer = computerPlayerFactory();
                        moveValues = computerPlayer.getMoveValues(board);

                        // Post results to server so it will be stored there for next time.
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