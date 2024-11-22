import { Gameboard } from "./board";

export class Player {
    constructor(name='computer') {
        this.board = new Gameboard();
        this.name = name;
    }

    getBoard() {
        return this.board;
    }

    getName() {
        return this.name;
    }

    attack(x, y) {
        this.board.receiveAttack(x, y);
    }
}