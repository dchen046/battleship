import { Player } from "./player";

export class GameController {
    constructor(playerOneName='player', playerTwoName="computer") {
        this.playerOne = new Player(playerOneName);
        this.playerTwo = new Player(playerTwoName);
        this.activePlayer = this.playerOne;
        this.beingAttacked = this.playerTwo;
        
    }

    getActivePlayer() {
        return this.activePlayer;
    }

    getPlayerOne() {
        return this.playerOne;
    }

    getPlayerTwo() {
        return this.playerTwo;
    }

    #switchPlayer() {
        this.beingAttacked = this.beingAttacked === this.playerTwo ? this.playerOne : this.playerTwo;
    }

    playRound(x,y) {
        this.beingAttacked.checkAttack(x, y);
        this.#switchPlayer();
    }

}