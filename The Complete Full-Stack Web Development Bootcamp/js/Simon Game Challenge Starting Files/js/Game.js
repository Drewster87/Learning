import { PlayerTurnRef } from "./PlayerTurnRef.js";
import { SimonButton } from "./SimonButton.js";
import { TimeoutRef } from "./TimeoutRef.js";

/**
 * Class for overall game logic.
 */
export class Game {
    constructor() {
        let isPlayerturn = false;

        /** @type {PlayerTurnRef} */
        this._playerTurnRef = new PlayerTurnRef(isPlayerturn)

        /** @type {boolean} */
        this._isNewGameAvailable = true;

        let timeout = 1000;

        /** @type {TimeoutRef} */
        this._timeoutRef = new TimeoutRef(timeout);

        /** @type {Map<string, SimonButton>} */
        this._simonButtons = new Map();
        let buttons = $(".btn");
        console.log(buttons);
        for (let button of buttons) {
            console.log(button);
            if (button.classList.contains("yellow")) {
                let btn = new SimonButton("./sounds/yellow.mp3", button, this._playerTurnRef, this._timeoutRef);
                this._simonButtons.set("yellow", btn);
                btn.addEventListener('buttonClicked', (e) => this._buttonClickedHandler(e));
            }
            else if (button.classList.contains("blue")) {
                let btn = new SimonButton("./sounds/blue.mp3", button, this._playerTurnRef, this._timeoutRef);
                this._simonButtons.set("blue", btn);
                btn.addEventListener('buttonClicked', (e) => this._buttonClickedHandler(e));
            }
            else if (button.classList.contains("green")) {
                let btn = new SimonButton("./sounds/green.mp3", button, this._playerTurnRef, this._timeoutRef);
                this._simonButtons.set("green", btn);
                btn.addEventListener('buttonClicked', (e) => this._buttonClickedHandler(e));
            }
            else if (button.classList.contains("red")) {
                let btn = new SimonButton("./sounds/red.mp3", button, this._playerTurnRef, this._timeoutRef);
                this._simonButtons.set("red", btn);
                btn.addEventListener('buttonClicked', (e) => this._buttonClickedHandler(e));
            }
        }

        /** @type {SimonButton[]} */
        this._pattern = [];

        /** @type {SimonButton[]} */
        this._userPattern = [];

        /** @type {Number} */
        this._numTurns = 0;
    }

    /** @param {Event} e */
    _buttonClickedHandler(e) {
        this._userPattern.push(e.detail.button);
        this._checkUserInput();
    }

    _checkUserInput() {
        let idx = 0;
        for (let button of this._userPattern) {
            if (this._pattern[idx] != button) {
                this._gameOver();
                return;
            }
            if (idx + 1 == this._pattern.length) {
                this._playerTurnRef.playerTurn = false;
                setTimeout(() => this._nextTurn(), 2000);
            }
            idx += 1;
        }
    }

    async _gameOver() {
        this.isPlayerturn = false;
        for (let element of this._simonButtons.entries()) {
            element[1]._button.classList.add('game-over');
        }

        await this._delay(1000);

        for (let element of this._simonButtons.entries()) {
            element[1]._button.classList.remove('game-over');
        }

        await this._playPattern();

        await this._delay(500);

        for (let element of this._simonButtons.entries()) {
            element[1]._button.classList.add('game-over');
        }

        this._isNewGameAvailable = true;
    }

    _reset() {
        for (let element of this._simonButtons.entries()) {
            element[1]._button.classList.remove('game-over');
        }
        this._timeoutRef.timeout = 1000;
        this._pattern = [];
        this._userPattern = [];
        this._numTurns = 0;
    }

    async _nextTurn() {
        this._playerTurnRef.playerTurn = false;
        this._numTurns += 1;
        this._timeoutRef.timeout = 1000 - Math.floor(this._numTurns / 5) * 500;
        if (this._timeoutRef.timeout < 100) {
            this._timeoutRef = 100;
        }
        let idx = Math.floor(Math.random() * 4);
        let entries = Array.from(this._simonButtons);
        this._pattern.push(entries[idx][1]);
        this._userPattern = [];
        await this._playPattern();
        this._playerTurnRef.playerTurn = true;
    }

    start() {
        if (this._isNewGameAvailable) {
            this._reset();
            this._isNewGameAvailable = false;
            this._nextTurn();
        }
    }

    async _playPattern() {
        for (let button of this._pattern) {
            await button.play();
        }
    }

    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}