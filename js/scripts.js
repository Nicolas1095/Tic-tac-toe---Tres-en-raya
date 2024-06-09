$(document).ready(function () {
    let cells = document.getElementsByTagName("td");
    let currentPlayer = "X";
    let playerColor = "#03588C";
    let table = [["", "", ""], ["", "", ""], ["", "", ""]];
    let amount = 0
    let score = [0, 0];
    let storedScore = localStorage.getItem("score");
    if (storedScore) {
        score = JSON.parse(storedScore);
        $("#scoreX").text(score[0]);
        $("#scoreO").text(score[1]);
    }

    function checkWin() {
        let rows = 3;
        let cols = 3;
        for (let i = 0; i < rows; i++) {
            if (table[i][0] === table[i][1] && table[i][1] === table[i][2] && table[i][0] !== "") {
                return true;
            }
        }
        for (let i = 0; i < cols; i++) {
            if (table[0][i] === table[1][i] && table[1][i] === table[2][i] && table[0][i] !== "") {
                return true;
            }
        }
        if (table[0][0] === table[1][1] && table[1][1] === table[2][2] && table[0][0] !== "") {
            return true;
        }
        if (table[0][2] === table[1][1] && table[1][1] === table[2][0] && table[0][2] !== "") {
            return true;
        }
        return false;
    }

    for (let i = 0; i < cells.length; i++) {
        $(cells[i]).on("click", function () {
            if ($(cells[i]).children().length < 1 && !checkWin()) {
                $(cells[i]).append('<span style="color:' + playerColor + ';">' + currentPlayer + "</span>");
                let row = Math.floor(i / 3);
                let col = i % 3;
                table[row][col] = currentPlayer;
                amount += 1
                if (checkWin()) {
                    $("h2").append('¡El jugador <span style="color:' + playerColor + ';">' + currentPlayer + "</span> ha ganado!")
                    $("#playAgain").fadeIn()
                    if (currentPlayer == "X") {
                        score[0] = parseInt(score[0]) + 1;
                        $("#scoreX").text(score[0]);
                    } else {
                        score[1] = parseInt(score[1]) + 1;
                        $("#scoreO").text(score[1]);
                    }
                    localStorage.setItem("score", JSON.stringify(score));
                }
                else if (amount == 9) {
                    $("h2").append("Ningún jugador ha ganado.")
                    $("#playAgain").fadeIn()
                }
                currentPlayer = currentPlayer == "X" ? "O" : "X";
                playerColor = playerColor == "#03588C" ? "#D93232" : "#03588C";
            }
        });
    }
    $("#playAgain").on("click", function () { location.reload(); });
});