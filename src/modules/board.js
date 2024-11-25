import { Ship } from "./ship";

class Cell {
    constructor(ship = null) {
        this.ship = ship;
        this.alreadyHit = false;
    }

    hit() {
        this.alreadyHit = true;
        if (this.ship) {
            this.ship.hit();
            return true;
        }
        return false;
    }

    hasSunk() {
        if (this.ship) {
            return this.ship.isSunk();
        }
    }

    setShip(ship) {
        this.ship = ship;
    }

    hasShip() {
        return this.ship !== null;
    }
}

export class Gameboard {
    constructor(size = 8) {
        this.board = []
        this.#resetBoard(size);
        this.ships = [];
        this.#initShips();
        this.size = size;
        this.sunkedShips = 0;
    }

    #resetBoard(size) {
        for (let i = 0; i < size; ++i) {
            const row = [];
            for (let j = 0; j < size; ++j) {
                row.push(new Cell());
            }
            this.board.push(row);
        }
    }

    #initShips() {
        const shipLengths = [2, 3, 4, 5];
        shipLengths.forEach((length) => {
            this.#createNewShip(length);
        })
    }

    #createNewShip(length) {
        this.ships.push(new Ship(length));
    }

    gameover() {
        return this.sunkedShips == this.ships.length;
    }

    placeShipRandomly() {
        this.ships.forEach((ship) => {
            let x, y, dir;
            do {
                x = Math.floor(Math.random() * this.size);
                y = Math.floor(Math.random() * this.size);
                dir = Math.floor(Math.random() * 2) == 0 ? 'v' : 'h';
                console.log(`${x}, ${y} : ${dir} : ${ship.length}`);
            } while (!this.placeShip([x, y], ship, dir));
        });
    }

    placeShip(coords, ship, dir) {
        if (!this.#isValidPlacement(coords, ship.length, dir)) return false;

        if (dir === 'v') {
            for (let i = coords[0]; i < coords[0] + ship.length; ++i) {
                this.board[i][coords[1]].setShip(ship);
            }
            return true;
        } else {
            for (let i = coords[1]; i < coords[1] + ship.length; ++i) {
                this.board[coords[0]][i].setShip(ship);
            }
            return true;
        }
    }

    #isValidPlacement(coords, shipLength, dir) {
        let row = coords[0];
        let col = coords[1];
        if (dir === 'v') {
            if (row + shipLength >= this.size) return false;
            for (let i = row; i < row + shipLength; ++i) {
                if (this.board[i][col].hasShip()) return false;
            }
        } else {
            if (col + shipLength >= this.size) return false;
            for (let i = col; i < col + shipLength; ++i) {
                if (this.board[row][i].hasShip()) return false;
            }
        }
        return true;
    }

    // 1 2 v 2

    receiveAttack(row, col) {
        if (!this.board[row][col].alreadyHit) {
            if (this.board[row][col].hit()) {
                if (this.board[row][col].hasSunk()) ++this.sunkedShips;
                return true;
            }

        }
        return false;
    }
}