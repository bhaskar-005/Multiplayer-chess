import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./data";
import { playground } from "./Playground";

export class gameManager {
    private games: playground[];  
    private pendingUser: WebSocket | null;
    private allPlayers: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.allPlayers = [];
    }

    addUser(socket: WebSocket) {
        console.log('you user added ');
        
        this.allPlayers.push(socket);
        this.addHandler(socket);
        // whenever a new user joins, push them into allPlayers
    }

    removeUser(socket: WebSocket) {
        this.allPlayers = this.allPlayers.filter(user => user !== socket);
        // reconnection logic TODO
    }

    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            const parsed = JSON.parse(data.toString());
             console.log(parsed);
             
            if (parsed.type === INIT_GAME) {
                if (this.pendingUser) {
                    const newGame = new playground(socket, this.pendingUser);  // creates a new playground
                    // should be pushed into the global games array
                    console.log('game created');
                    
                    this.games.push(newGame);
                    // remove the user from the pending state
                    this.pendingUser = null;
                } else {
                    console.log('you are on waitlist.');
                    
                    this.pendingUser = socket; // if no user in pending, put this user in pending
                }
            }

            if (parsed.type === MOVE) {
                const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
                if (game) {
                    game.makeMove(socket, parsed.move); 
                }
            }
        });
    }
}
