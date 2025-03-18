import { Game } from "./js/Game.js";

/** @type {Game} */
var game = new Game();
$(document).on("keydown", function () { game.start(); })