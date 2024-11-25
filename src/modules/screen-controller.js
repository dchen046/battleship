import { GameController } from "./game-controller";

export class ScreenController {
    constructor() {
        this.game = new GameController("Chungus");
        this.playersDiv = document.getElementById('playerDiv');
        this.compDiv = document.getElementById('compDiv');
        this.updateScreen();
        this.resetBtnEvent();
    }

    updateScreen() {
        this.updateP1Board();
        this.updateP2Board();
    }

    updateP1Board() {
        this.playersDiv.textContent = "";
        this.game.getPlayerOne().getBoard().board.forEach((row, r_index) => {
            row.forEach((col, c_index) => {
                const button = document.createElement('button');
                button.classList.add('no-click');

                if (col.hasShip()) {
                    button.classList.add('btn', 'btn-warning');
                }

                button.dataset.row = r_index;
                button.dataset.col = c_index;
                this.addBtnEvent(button);
                this.playersDiv.append(button);
            });
        })
    }

    updateP2Board() {
        this.compDiv.textContent = "";
        this.game.getPlayerTwo().getBoard().board.forEach((row, r_index) => {
            row.forEach((col, c_index) => {
                const button = document.createElement('button');
                if (col.hasShip()) {
                    button.classList.add('btn', 'btn-warning');
                }
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
            this.checkWinner();
            console.log(`row: ${button.dataset.row} col: ${button.dataset.col}`);
        });
    }

    checkWinner() {
        if (this.game.gameover()) {
            let msg = `${this.game.getActivePlayer().name} has won!`;
            document.getElementById('winner').textContent = msg;
            let btns = this.compDiv.getElementsByTagName('button')
            for (const btn of btns) {
                btn.classList.add('no-click');
            }
        } else {
            this.game.switchPlayer();
            this.computerTurn();
        }
    }

    computerTurn() {
        if (this.game.getActivePlayer().name == 'computer') {
            let btns = this.playersDiv.getElementsByTagName('button');
            let btn;
            do {
                let index = Math.floor(Math.random() * btns.length);
                btn = btns[index];
            } while (btn.classList.contains('used'));
            btn.classList.add('used');
            btn.click();
        }
    }

    resetBtnEvent() {
        const btn = document.getElementById('reset');
        btn.addEventListener('click', () => {
            this.game.getPlayerOne().getBoard().placeShipRandomly();
            this.updateP1Board();
        });
    }
}