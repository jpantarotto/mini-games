interface PieceType {
   color: string;
   hexCode: string;
   symbol: string;
}

const Empty: PieceType = {
    color: 'WHITE',
    hexCode: '#FFFFFF',
    symbol: '0'
}

const Red: PieceType = {
    color: 'RED',
    hexCode: '#FF0000',
    symbol: 'R'
}

const Yellow: PieceType = {
    color: 'YELLOW',
    hexCode: '#FFFF00',
    symbol: 'Y'
}

export { Empty, Red, Yellow };
export type { PieceType };
