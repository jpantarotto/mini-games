import { Grid } from "./Grid";
import { Empty, Red, Yellow, type PieceType } from "./PieceType";
import { Player } from "./Player";

export class Game {
    #grid: Grid;
    #connectN: number;
    #players: Player[] = [];
    #score: {[key:string]: number} = {};
    #targetScore: number;

    constructor(grid: Grid, connectN: number, targetScore: number) {
        this.#grid = grid;
        this.#connectN = connectN;
        this.#targetScore = targetScore;
        this.#initPlayers();
        this.#initScore();
    }

    #initPlayers() {
        const players = [];
        let selected;
        for (let i = 1; i <= 2; i++) {
            let playerName = null;
            while (!playerName) {
                playerName = prompt(`Enter name for player ${i}:`);
            }
            if (selected === null) {
                let colorChoice = prompt(`Select piece color: [R] Red | [Y] Yellow`);
                if (colorChoice && colorChoice.toLowerCase().charAt(0) === 'r') {
                    selected = Red;
                } else {
                    selected = Yellow;
                }
            } else {
                selected = selected === Red ? Yellow : Red;
            }
            console.log(`Player ${playerName} assigned piece color: ${selected.color}`);
            
            this.#players.push(new Player(playerName, selected));
        }
    }

    #initScore() {
        this.#score = {};
        for (const player of this.#players) {
            this.#score[player.getName()] = 0;
        }
    }

    #printBoard() {
        console.log('Board:\n');
        const grid = this.#grid.getGrid();
        for (let r = 0; r < grid.length; r++) {
            let row = '';
            for (let piece of grid[r]) {
                switch (piece) {
                    case Empty:
                        row += '0';
                        break;
                    case Red:
                        row += 'R';
                        break;
                    case Yellow:
                        row += 'Y';
                        break;
                    default:
                        throw new Error('Unknown piece on board');
                }
            }
            console.log(row);
        }
        console.log('');
    }

    #playMove(player: Player): [number, number] {
        this.#printBoard();
        console.log(`%c ${player.getName()}'s turn`, `color: ${player.getPieceType().hexCode}`);
        const colCount = this.#grid.getColums();
        const moveCol = Number(prompt(`Enter column between ${0} and ${colCount - 1} to add piece:`));
        
        return this.#grid.placePiece(moveCol, player.getPieceType());
    }

    #playRound() {
        while (true) {
            for (const player of this.#players) {
                let [row, col] = this.#playMove(player);
                if (this.#grid.checkWin(this.#connectN, row, col, player.getPieceType())) {
                    this.#score[player.getName()]++;
                    return player;
                }
            }
        }
    }

    play() {
        let maxScore = 0;
        let winner = null;
        while (maxScore < this.#targetScore) {
            winner = this.#playRound();
            console.log(`${winner.getName()} won the round`, 'Resetting board...');
            maxScore = Math.max(this.#score[winner.getName()] ?? 0, maxScore);
            this.#grid.initGrid();
        }
        console.log(`${winner?.getName()} won the game`, 'Game Over');
    }
}