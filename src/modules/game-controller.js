import { Player } from "./player";

export class GameController {
    constructor(playerOneName = 'player', playerTwoName = "computer") {
        this.playerOne = new Player(playerOneName);
        this.playerTwo = new Player(playerTwoName);

        this.activePlayer = this.playerOne;
        this.beingAttacked = this.playerTwo;

        this.playerOne.getBoard().placeShipRandomly();  
        this.playerTwo.getBoard().placeShipRandomly();
    }

    gameover() {
        return this.beingAttacked.getBoard().gameover();
    }

    getActivePlayer() {
        return this.activePlayer;
    }

    getBeingAttacked() {
        return this.beingAttacked;
    }

    getPlayerOne() {
        return this.playerOne;
    }

    getPlayerTwo() {
        return this.playerTwo;
    }

    switchPlayer() {
        this.activePlayer = this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne;

        this.beingAttacked = this.beingAttacked === this.playerTwo ? this.playerOne : this.playerTwo;
    }

    playRound(x, y) {
        const hit = this.beingAttacked.attack(x, y);
        return hit;
    }

}