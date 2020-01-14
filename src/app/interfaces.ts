export interface Token {
    token: string;
}

export interface User {
    username: string;
}

export interface Card {
    id: number;
    name: string;
    health: number;
    damage: number;
    manaCost: number;
    img?: Blob;
    present?: boolean;
}

export interface Deck {
    id: number;
    name: string;
    cards?: Card[];
}

export interface PlayerData {
    cards: number[];
    health: number;
    mana?: number;
    played: {
        id: number;
        disabled: boolean;
    }[];
}
