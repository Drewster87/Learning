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
        /** @type {TimeoutRef} */
        this._timeout = timeout;

        this._setupButton();
    }

    _setupButton() {
        this._button.addEventListener('click', () => this._clickEventHandler())
    }

    _clickEventHandler() {
        if (this._playerTurn.playerTurn) {
            const event = new CustomEvent('buttonClicked', {
                detail: {
                    button: this,
                },
            });
            this.play();
            this.dispatchEvent(event);
        }
    }

    async play() {
        let audio = new Audio(this._audioPath);
        audio.play();
        this._button.classList.remove("pressed");
        await this._delay(10);
        this._button.classList.add("pressed");
        await this._delay(this._timeout.timeout);
        this._stop();
        await this._delay(50);
    }

    _stop() {
        this._button.classList.remove("pressed");
    }

    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}