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
            row.forEach((col, c_index) => {
                const button = document.createElement('button');
                button.classList.add('no-click');
                button.dataset.row = r_index;
                button.dataset.col = c_index;
                this.addBtnEvent(button);
                this.playersDiv.append(button);
            });
        })
    }

    updateP2Board() {
        this.game.getPlayerTwo().getBoard().board.forEach((row, r_index) => {
            row.forEach((col, c_index) => {
                const button = document.createElement('button');
                button.dataset.row = r_index;
                button.dataset.col = c_index;
                this.addBtnEvent(button);
                this.compDiv.append(button);
            });
        })
    }

    addBtnEvent(button) {
        button.addEventListener('click', () => {
            const hit = this.game.playRound(button.dataset.row, button.dataset.col);
            button.disabled = true;
            if (hit) {
                const btnClasses = ['btn', 'btn-danger'];
                button.classList.add(...btnClasses);
            }
            console.log(`row: ${button.dataset.row} col: ${button.dataset.col}`);
        });
    }
}