import { Player } from "./player";

export class GameController {
    constructor(playerOneName = 'player', playerTwoName = "computer") {
        this.playerOne = new Player(playerOneName);
        this.playerTwo = new Player(playerTwoName);

        this.activePlayer = this.playerOne;
        this.beingAttacked = this.playerTwo;

        this.playerOne.getBoard().placeShipRandomly();  
        this.playerTwo.getBoard().placeShipRandomly();

        console.log(this.beingAttacked.getBoard().board);
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

    playRound(x, y) {
        const hit = this.beingAttacked.attack(x, y);
        // this.#switchPlayer();
        return hit;
    }

}