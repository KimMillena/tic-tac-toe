const createBoard = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    console.log("The board is ready");
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

  const playRound = (index) => {
    createBoard.placeMarker(index, `${currentPlayer.marker}`);

    switchPlayerTurn();

    console.log(createBoard.getBoard());
  };

  return { playRound };
}

const game = GameController();

game.playRound(0);
game.playRound(1);
game.playRound(3);
game.playRound(6);
game.playRound(6);
