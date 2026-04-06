import type { PieceType } from "./PieceType";

export class Player {
    #name: string;
    #pieceType: PieceType;

    constructor(name: string, pieceType: PieceType) {
        this.#name = name;
        this.#pieceType = pieceType;
    }

    getName() {
        return this.#name;
    }

    getPieceType() {
        return this.#pieceType;
    }
}