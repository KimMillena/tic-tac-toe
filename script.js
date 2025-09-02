const newBoard = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return gameBoard;
  };

  const placeMarker = (index, marker) => {
    if (index < 0 || index > gameBoard.length || gameBoard[index] !== "") {
      return false;
    } else {
      gameBoard[index] = marker;
      display.drawMarker(index, marker);
      return true;
    }
  };

  return { getBoard, placeMarker };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

function gameController() {
  const player1 = createPlayer("Kim", "X");
  const player2 = createPlayer("Mik", "O");

  let currentPlayer = player1;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinner = (marker) => {
    if (
      (newBoard.getBoard()[0] === marker &&
        newBoard.getBoard()[1] === marker &&
        newBoard.getBoard()[2] === marker) ||
      (newBoard.getBoard()[3] === marker &&
        newBoard.getBoard()[4] === marker &&
        newBoard.getBoard()[5] === marker) ||
      (newBoard.getBoard()[6] === marker &&
        newBoard.getBoard()[7] === marker &&
        newBoard.getBoard()[8] === marker) ||
      (newBoard.getBoard()[0] === marker &&
        newBoard.getBoard()[3] === marker &&
        newBoard.getBoard()[6] === marker) ||
      (newBoard.getBoard()[1] === marker &&
        newBoard.getBoard()[4] === marker &&
        newBoard.getBoard()[7] === marker) ||
      (newBoard.getBoard()[2] === marker &&
        newBoard.getBoard()[5] === marker &&
        newBoard.getBoard()[8] === marker) ||
      (newBoard.getBoard()[0] === marker &&
        newBoard.getBoard()[4] === marker &&
        newBoard.getBoard()[8] === marker) ||
      (newBoard.getBoard()[2] === marker &&
        newBoard.getBoard()[4] === marker &&
        newBoard.getBoard()[6] === marker)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const playRound = (index) => {
    const playerName = currentPlayer.name;
    const playerMarker = currentPlayer.marker;

    const validMove = newBoard.placeMarker(index, `${playerMarker}`);

    if (!validMove) return;

    if (checkWinner(playerMarker)) {
      display.displayResult("Winner", playerName);
    } else if (!newBoard.getBoard().includes("")) {
      display.displayResult("Draw", playerName);
    }

    switchPlayerTurn();
    console.log(newBoard.getBoard());
  };

  return { playRound };
}

function displayController() {
  const board = document.querySelector(".board");
  const dialog = document.querySelector(".modal");
  const inputDialog = document.querySelector(".input-modal");
  const player1Name = document.querySelector("#player1");
  const player2Name = document.querySelector("#player2");

  inputDialog.showModal();

  newBoard.getBoard().forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add(`board-cell`);
    cell.setAttribute("data-index", index);

    cell.addEventListener("click", (e) => {
      game.playRound(e.target.getAttribute("data-index"));
    });

    board.appendChild(cell);
  });

  const drawMarker = (index, marker) => {
    const cells = document.querySelectorAll(".board-cell");
    const cell = cells[index];
    cell.textContent = `${marker}`;
  };

  const displayResult = (gameResult, playerName) => {
    const dialogGameResult = document.querySelector(".game-result");
    const dialogPlayerName = document.querySelector(".player-name");
    const newBtn = document.querySelector(".new-btn");

    dialogGameResult.textContent = `${gameResult}:`;
    dialogPlayerName.textContent = `${playerName}`;

    newBtn.addEventListener("click", () => {
      dialog.close();
    });

    dialog.showModal();
  };

  return {
    drawMarker,
    displayResult,
  };
}

const game = gameController();
const display = displayController();

// Player 1 wins

// game.playRound(0);
// game.playRound(1);
// game.playRound(3);
// game.playRound(7);
// game.playRound(6);

// Player 2 wins
// game.playRound(3);
// game.playRound(0);
// game.playRound(5);
// game.playRound(4);
// game.playRound(7);
// game.playRound(8);

// Draw
// game.playRound(3);
// game.playRound(0);
// game.playRound(4);
// game.playRound(5);
// game.playRound(8);
// game.playRound(6);
// game.playRound(2);
// game.playRound(1);
// game.playRound(7);
