const newBoard = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return gameBoard;
  };

  const resetBoard = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
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

  return { getBoard, resetBoard, placeMarker };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

function gameController() {
  const inputDialog = document.querySelector(".input-modal");
  const submitBtn = document.querySelector(".submit-btn");

  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  display.displayTurn(currentPlayer);

  inputDialog.showModal();

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const player1Name = document.querySelector("#player1").value;
    const player2Name = document.querySelector("#player2").value;
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    currentPlayer = player1;
    display.displayTurn(currentPlayer);
    inputDialog.close();
  });

  const newRound = () => {
    newBoard.resetBoard();
    display.displayBoard();
  };

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    display.displayTurn(currentPlayer);
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

  return { playRound, newRound };
}

function displayController() {
  const dialog = document.querySelector(".modal");

  const displayBoard = () => {
    const board = document.querySelector(".board");
    board.innerHTML = "";

    newBoard.getBoard().forEach((value, index) => {
      const cell = document.createElement("div");
      cell.classList.add(`board-cell`);
      cell.setAttribute("data-index", index);

      cell.addEventListener("click", (e) => {
        game.playRound(e.target.getAttribute("data-index"));
      });

      board.appendChild(cell);
    });
  };

  const drawMarker = (index, marker) => {
    const cells = document.querySelectorAll(".board-cell");
    const cell = cells[index];
    cell.textContent = `${marker}`;
  };

  const displayTurn = (currentPlayer) => {
    const playerTurn = document.querySelector(".player-turn");
    playerTurn.textContent = `${currentPlayer.name}'s turn`;
  };

  const displayResult = (gameResult, playerName) => {
    const dialogGameResult = document.querySelector(".game-result");
    const dialogPlayerName = document.querySelector(".player-name");
    const newBtn = document.querySelector(".new-btn");

    dialogGameResult.textContent = `${gameResult}:`;
    dialogPlayerName.textContent = `${playerName}`;

    newBtn.addEventListener("click", () => {
      game.newRound();
      dialog.close();
    });

    dialog.showModal();
  };

  displayBoard();

  return {
    displayBoard,
    drawMarker,
    displayTurn,
    displayResult,
  };
}

const display = displayController();
const game = gameController();

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
