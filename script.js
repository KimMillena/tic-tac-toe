const createBoard = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    console.log("The board is ready");
    return gameBoard;
  };

  const placeMarker = (index, marker) => {
    gameBoard[index] = marker;
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
