# mini-games

A collection of console-based mini-games built with Bun and TypeScript.

## Project Structure

```
mini-games/
└── connect-four/          # Connect Four game
    ├── src/
    │   ├── index.ts       # Entry point — initializes Game with grid size and win config
    │   ├── Game.ts        # Game controller: player setup, turns, scoring, display
    │   ├── Grid.ts        # Board state, piece placement (gravity), win detection
    │   ├── Player.ts      # Player model (name + piece type)
    │   └── PieceType.ts   # Piece enum: Empty, Red, Yellow (with color/symbol metadata)
    ├── package.json
    └── tsconfig.json
```

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript (strict mode, ESNext)
- **Module system**: ES Modules

## Running a Game

```bash
cd connect-four
bun install
bun run src/index.ts
```

## Architecture

Games follow an MVC-like pattern:
- **Model**: `Player`, `PieceType`, `Grid`
- **Controller**: `Game` — manages flow, input, scoring
- **View**: Console output via `console.log`

Classes use TypeScript private fields (`#`) for encapsulation.

## Connect Four Details

- 6×7 grid, 4-in-a-row to win, first to 2 rounds wins the match
- Gravity simulation: pieces drop to the lowest available row
- Win detection checks horizontal, vertical, and both diagonals after each move
- Known issue: color output not yet working in CLI (color metadata defined in `PieceType.ts` but not applied to output)

## No Tests

There is no automated test suite. Testing is done manually through console interaction.
