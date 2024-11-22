import { GameController } from "./game-controller";

export class ScreenController {
    constructor() {
        this.game = new GameController("Hihi");
        this.playersDiv = document.getElementById('playerDiv');
        this.compDiv = document.getElementById('compDiv');
        this.turnDiv = document.getElementById('turnDiv');
        this.updateScreen();
    }

    updateScreen() {
        this.updateTurn();
        this.updateP1Board();
        this.updateP2Board();
        
    }

    updateTurn() {
        this.turnDiv.textContent = `${this.game.getActivePlayer().getName()} turn`;
    }

    updateP1Board() {
        this.game.getPlayerOne().getBoard().board.forEach((row, r_index) => {
            row.forEach( (col, c_index) => {
                const button = document.createElement('button');
                button.dataset.row = r_index;
                button.dataset.row = c_index;
                this.playersDiv.append(button);
            });
        })
    }
    updateP2Board() {
        this.game.getPlayerTwo().getBoard().board.forEach((row, r_index) => {
            row.forEach( (col, c_index) => {
                const button = document.createElement('button');
                button.dataset.row = r_index;
                button.dataset.row = c_index;
                this.compDiv.append(button);
            });
        })
    }
}