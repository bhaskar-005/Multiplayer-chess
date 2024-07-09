# Multiplayer Chess Game

This is a multiplayer chess game website that allows users to play chess against each other in real-time. The game uses WebSocket connections to enable seamless communication between players.

## Features

- Real-time multiplayer chess gameplay
- WebSocket connections for fast and reliable communication
- User-friendly interface

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bhaskar-005/Multiplayer-chess.git
```

2. Navigate to the project directory:

```bash
cd Multiplayer-chess
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd server
```

2. Install the dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run build
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd client
```

2. Install the dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

### Accessing the Game

1. Open your web browser and go to `http://localhost:3000` to access the chess game.

### WebSocket Connection

The server establishes WebSocket connections to manage real-time communication between players. The WebSocket server listens for incoming connections and handles the following messages:

- `INIT_GAME`: Initialize a new game when a player joins.
- `MOVE`: Handle a player's move and update the game state for both players.
- `GAME_OVER`: Notify players when the game is over.

## Code Structure

- `server/`: Contains the backend code for the server and game logic.
- `client/`: Contains the frontend code built with React and Vite.
