import { GameController } from "./game-controller";

class ScreenController {
    constructor() {
        this.game = new GameController();
        this.playersDiv = document.getElementById('playerDiv');
        this.compDiv = document.getElementById('compDiv');
        this.turnDiv = document.getElementById('turnDiv');
    }

    updateScreen() {
        
    }
}