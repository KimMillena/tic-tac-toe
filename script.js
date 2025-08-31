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
      return false;
    }
  };

  return { getBoard, placeMarker };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

function GameController() {
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
    newBoard.placeMarker(index, `${currentPlayer.marker}`);

    if (checkWinner(currentPlayer.marker)) {
      console.log(`${currentPlayer.name} Wins!`);
      return console.log("Game Over.");
    } else if (!newBoard.getBoard().includes("")) {
      console.log("It's a Draw");
      return console.log("Game Over.");
    }

    switchPlayerTurn();
    console.log(newBoard.getBoard());
  };

  return { playRound };
}

const game = GameController();
