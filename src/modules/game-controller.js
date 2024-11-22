import { Player } from "./player";

export class GameController {
    constructor(playerOneName, playerTwoName="computer") {
        this.playerOne = new Player(playerOneName);
        this.playerTwo = new Player(playerTwoName);
        this.beingAttacked = this.playerTwo;
        this.activePlayer = this.playerOne;
    }

    getActivePlayer() {
        return this.activePlayer;
    }

    #switchPlayer() {
        this.beingAttacked = this.beingAttacked === this.playerTwo ? this.playerOne : this.playerTwo;
    }

    playRound(x,y) {
        this.beingAttacked.checkAttack(x, y);
        this.#switchPlayer();
    }

}