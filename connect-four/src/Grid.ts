import { Empty, type PieceType } from "./PieceType";

export class Grid {
    #rows: number;
    #columns: number;
    #grid: PieceType[][] = [];

    constructor(rows: number, columns:  number) {
        this.#rows = rows;
        this.#columns = columns;
        this.initGrid();
    }

    initGrid(): void {
        this.#grid = Array(this.#rows).fill(0).map(()=> Array(this.#columns).fill(Empty));
    }

    getGrid(): PieceType[][] {
        return this.#grid;
    }

    getColums(): number {
        return this.#columns;
    }

    getRows(): number {
        return this.#rows;
    }

    placePiece(column: number, piece: PieceType): [number, number] {
        if (column < 0 || column >= this.#columns) {
            throw new Error('Invalid column');
        }
        if (piece === Empty) {
            throw new Error(`Invalid piece type: ${piece}`);
        }
        for (let row = this.#rows - 1; row >= 0; row--) {
            if (this.#grid[row][column] === Empty) {
                this.#grid[row][column] = piece;
                return [row, column];
            }
        }

        throw new Error(`Column: ${column} is full. Piece cannot be placed`);
    }

    checkWin(connectN: number, row: number, column: number, piece: PieceType): boolean {
        // Check Horizontal
        let count = 0;
        for (let c = 0; c < this.#columns; c++) {
            if (this.#grid[row][c] === piece) {
                count++;
            } else {
                count = 0;
            }
            if (count === connectN) {
                return true;
            }
        }

        // Check Vertical
        count = 0;
        for (let r = 0; r < this.#rows; r++) {
            if (this.#grid[r][column] === piece) {
                count++;
            } else {
                count = 0;
            }

            if (count === connectN) {
                return true;
            }
        }

        // Check Diagonal
        count = 0;
        for (let r = 0; r < this.#rows; r++) {
            let c = row + column - r;
            if (c >=0 && c < this.#columns && this.#grid[r][c] === piece) {
                count++;
            } else {
                count = 0;
            }
            if (count === connectN) {
                return true;
            }
        }

        // Check Anti-Diagonal
        for (let r = 0; r < this.#rows; r++) {
            let c = column - row + r;
            if (c >= 0 && c < this.#columns && this.#grid[r][c] === piece) {
                count++;
            } else {
                count = 0;
            }
            if (count === connectN) {
                return true;
            }
        }

        return false;
    }
}