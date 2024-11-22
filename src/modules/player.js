import { Gameboard } from "./board";

export class Player {
    constructor(name='computer') {
        this.board = new Gameboard();
    }

    getBoard() {
        return this.board;
    }

    attack(x, y) {
        this.board.receiveAttack(x, y);
    }
}