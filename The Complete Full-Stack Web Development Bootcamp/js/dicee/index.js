document.getElementById("rollBtn").addEventListener('click', newRoll);

function newRoll() {
    let p1Number = Math.round(Math.random() * 5) + 1;
    let p2Number = Math.round(Math.random() * 5) + 1;

    let images1 = document.getElementsByClassName("img1");
    let images2 = document.getElementsByClassName("img2");


    if (images1.length > 0) {
        images1[0].src = "images/dice" + p1Number.toString() + ".png"
    }

    if (images2.length > 0) {
        images2[0].src = "images/dice" + p2Number.toString() + ".png"
    }

    let winnerString = '';
    if (p1Number > p2Number) {
        winnerString = 'Player 1 Wins!';
    }
    else if (p2Number > p1Number) {
        winnerString = 'Player2 Wins!';
    }
    else {
        winnerString = 'Tie!';
    }
    document.getElementById("winner").innerHTML = winnerString;
}