export interface Token {
    token: string;
}

export interface User {
    
}

export interface Card {
    id: number;
    name: string;
    health: number;
    damage: number;
    manaCost: number;
    img?: Blob;
}
