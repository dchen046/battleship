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
            for (let j = 0; j < size; ++j) {
                this.board[i][j] = new Cell();
            }
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
            let x;
            let y;
            do {
                x = Math.floor(Math.random() * this.board.size);
                y = Math.floor(Math.random() * this.board.size);
            } while (!this.board.placeShip([x,y], ship));
        })
    }

    placeShip(coords, ship, dir = 'v') {
        if (dir === 'v') {
            if (this.#isValidPlacement(coords, ship.length, 'v')) {
                for (let i = coords[0]; i < ship.length; ++i) {
                    board[i][coords[1]].setShip(ship);
                }
                return true;
            }
        } else {
            if (this.#isValidPlacement(coords, ship.length, 'h')) {
                for (let i = coords[0]; i < ship.length; ++i) {
                    board[coords[0]][i].setShip(ship);
                }
                this.ships.push(ship);
                return true;
            }
        }
        return false;
    }

    #isValidPlacement(coords, shipLength, dir = 'v') {
        if (coords[0] + shipLength >= this.size || coords[1] + shipLength >= this.size) return false;

        if (dir == 'v') {
            for (let i = coords[1]; i < coords[1] + shipLength; ++i) {
                if (this.board[coords[0]][i].ship) {
                    return false;
                }
            }
        } else {
            for (let i = coords[0]; i < coords[0] + shipLength; ++i) {
                if (this.board[i][coords[1]].ship) {
                    return false;
                }
            }
        }
        return true;
    }

    receiveAttack(x, y) {
        if (!this.board[x][y].alreadyHit) {
            if (board[x][y].hit() && board[x][y].hasSunk()) {
                ++this.sunkedShips;
            }
        }
    }
}