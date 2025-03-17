/**
 * A simple class to pass a boolean by ref to another class.
 * @param {boolean} playerTurn - Indicates if it's the players turn to play.
 */
export class PlayerTurnRef {
    constructor(playerTurn) {
        /** @type {boolean} */
        this.playerTurn = playerTurn;
    }
}