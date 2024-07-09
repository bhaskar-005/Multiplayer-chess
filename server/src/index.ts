import { WebSocketServer } from 'ws';
import { gameManager } from './gameManager';

const wss = new WebSocketServer({ port: 8000 });
const GameManager = new gameManager();

wss.on('connection', function connection(ws) {
 console.log('user connected');
 
  GameManager.addUser(ws);
 
  ws.on('disconnect', ()=>{
    GameManager.removeUser(ws)

  });
   
});
