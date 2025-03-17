import { DrumButton } from "./js/DrumButton.js";

function keydownEventHandler(e) {
    drumButtons.forEach((element, i) => {
        if (e.key == element.keyChar) {
            element.play();
        }
    })
}

const drums = document.querySelectorAll(".drum");
var drumButtons = new Array();
var audioFiles = ["./sounds/crash.mp3", "./sounds/kick-bass.mp3", "./sounds/snare.mp3", "./sounds/tom-1.mp3", "./sounds/tom-2.mp3", "./sounds/tom-3.mp3", "./sounds/tom-4.mp3"]
var imageFiles = ["./images/crash.png", "./images/kick.png", "./images/snare.png", "./images/tom1.png", "./images/tom2.png", "./images/tom3.png", "./images/tom4.png",]
var idx = 0;

drums.forEach(function (element) {
    drumButtons.push(new DrumButton(element, audioFiles[idx]));
    idx++;
});

document.addEventListener("keydown", keydownEventHandler)