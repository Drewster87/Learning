import { PlayerTurnRef } from "./PlayerTurnRef.js";

/**
 * Creates a SimonButton that handles logic when user clicks a button in the game.
 * @param {string} audio - Path to audio file.
 * @param {HTMLDivElement} button - Reference to button element.
 * @param {PlayerTurnRef} playerTurn - Reference to bool indicating if it's the player's turn.
 */
export class SimonButton {
    constructor(audioPath, button, playerTurn) {
        /** @type {string} */
        this.audioPath = audioPath;
        /** @type {HTMLButtonElement} */
        this.button = button;
        /** @type {PlayerTurnRef} */
        this.playerTurn = playerTurn;
        /** @type {Number} */
        this.timeout = 1000;

        this.button.addEventListener("click", () => this.clickEventHandler());
    }

    clickEventHandler() {
        if (this.playerTurn.playerTurn) {
            this.play();
        }
    }

    setTimeout(timeout) {
        this.timeout = timeout;
    }

    play() {
        let audio = new Audio(this.audioPath);
        audio.play();
        this.button.classList.add("pressed");
        setTimeout(() => this.stop(), this.timeout);
    }

    stop() {
        this.button.classList.remove("pressed");
    }
}