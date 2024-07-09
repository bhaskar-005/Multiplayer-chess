import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./data";

export class playground {
    public player1: WebSocket;
    public player2: WebSocket;
    public chessBoard: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.chessBoard = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black'
            }
        }));
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
        // Check if the move is valid or not
        try {
            console.log('valid move');
            
            this.chessBoard.move(move);
        } catch (error) {
            console.log(error);
            return;
        }

        // Check if the game is over or not
        if (this.chessBoard.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.chessBoard.turn() === "w" ? 'black' : 'white'
                }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.chessBoard.turn() === "w" ? 'black' : 'white'
                }
            }));
            return;
        }

        // Send updated board to both the players
        console.log('before bord sends');
        
        if (this.chessBoard.history().length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
            console.log('sends to  user2');
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
            console.log('sends to  user1');
        }
    }
}
