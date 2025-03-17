/**
 * Creates a 
 * @param {HTMLButtonElement} button - The html button.
 * @param {string} audio - The path to the audio file.
 */
export class DrumButton {
    constructor(button, audio) {
        this.keyChar = button.innerHTML;
        this.audio = audio;
        this.button = button;

        this.button.addEventListener("click", () => this.clickEventHandler());
    }
    /**
     * Plays the file and changes style.
     */
    play() {
        var file = new Audio(this.audio);
        file.play();
        this.button.classList.add("pressed");
        setTimeout(() => {
            this.stop();
        }, 100);
    }
    /**
     * Removes the pressed class.
     */
    stop() {
        this.button.classList.remove("pressed");
    }

    /**
     * Callback function for click event.
     */
    clickEventHandler() {
        this.play();
        setTimeout(() => this.stop(), 100);
    }
}