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
  let wins = 0;

  const incrementWins = () => {
    wins++;
  };

  const getWins = () => {
    return wins;
  };

  const resetWins = () => {
    wins = 0;
  };

  return { name, marker, incrementWins, getWins, resetWins };
}

function gameController() {
  const inputDialog = document.querySelector(".input-modal");
  const submitBtn = document.querySelector(".submit-btn");
  const changeBtn = document.querySelector(".change-btn");
  const resetBtn = document.querySelector(".reset-btn");

  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  display.displayTurn(currentPlayer);
  display.displayScores(player1, player2);

  let gameOver = false;

  inputDialog.showModal();

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    initializePlayers();
  });

  changeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputDialog.showModal();
  });

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetGame();
  });

  function initializePlayers() {
    const player1Name = document.querySelector("#player1").value;
    const player2Name = document.querySelector("#player2").value;
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    currentPlayer = player1;
    display.displayTurn(currentPlayer);
    display.displayScores(player1, player2);
    inputDialog.close();
  }

  const resetGame = () => {
    newBoard.resetBoard();
    player1.resetWins();
    player2.resetWins();
    gameOver = false;
    display.displayScores(player1, player2);
    display.displayBoard();
  };

  const newRound = () => {
    newBoard.resetBoard();
    gameOver = false;
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

    if (gameOver) return;

    const validMove = newBoard.placeMarker(index, `${playerMarker}`);

    if (!validMove) return;

    if (checkWinner(playerMarker)) {
      currentPlayer.incrementWins();
      display.displayScores(player1, player2);
      display.displayResult("Winner", playerName);
      gameOver = true;
      console.log(gameOver);
    } else if (!newBoard.getBoard().includes("")) {
      display.displayResult("Draw", playerName);
      gameOver = true;
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

  const displayScores = (player1, player2) => {
    const player1Marker = document.querySelector(".player1-marker");
    const player1Name = document.querySelector(".player1-name");
    const player1Wins = document.querySelector(".player1-wins");
    const player2Marker = document.querySelector(".player2-marker");
    const player2Name = document.querySelector(".player2-name");
    const player2Wins = document.querySelector(".player2-wins");

    player1Marker.textContent = `${player1.marker}`;
    player1Name.textContent = `${player1.name}`;
    player1Wins.textContent = `Wins: ${player1.getWins()}`;
    player2Marker.textContent = `${player2.marker}`;
    player2Name.textContent = `${player2.name}`;
    player2Wins.textContent = `Wins: ${player2.getWins()}`;
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
    displayScores,
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
