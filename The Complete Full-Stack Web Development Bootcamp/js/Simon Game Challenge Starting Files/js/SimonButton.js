import { PlayerTurnRef } from "./PlayerTurnRef.js";
import { TimeoutRef } from "./TimeoutRef.js";

/**
 * Creates a SimonButton that handles logic when user clicks a button in the game.
 * @param {string} audio - Path to audio file.
 * @param {HTMLDivElement} button - Reference to button element.
 * @param {PlayerTurnRef} playerTurn - Reference to bool indicating if it's the player's turn.
 * @param {TimeoutRef} timeout - Reference to number indicating time of beep.
 */
export class SimonButton extends EventTarget {
    constructor(audioPath, button, playerTurn, timeout) {
        super();
        /** @type {string} */
        this._audioPath = audioPath;
        /** @type {HTMLDivElement} */
        this._button = button;
        /** @type {PlayerTurnRef} */
        this._playerTurn = playerTurn;
        /** @type {Number} */
        this._timeout = timeout;

        this._setupButton();
    }

    _setupButton() {
        this.button.addEventListener('click', () => this.clickEventHandler())
    }

    _clickEventHandler() {
        if (this.playerTurn.playerTurn) {
            const event = new CustomEvent('buttonClicked', {
                detail: {
                    button: this,
                },
            });
            this.play();
            this.dispatchEvent(event);
        }
    }

    play() {
        let audio = new Audio(this.audioPath);
        audio.play();
        this.button.classList.add("pressed");
        setTimeout(() => this._stop(), this.timeout);
    }

    _stop() {
        this.button.classList.remove("pressed");
    }
}