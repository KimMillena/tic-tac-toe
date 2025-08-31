const createBoard = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    console.log("The board is ready");
    return gameBoard;
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

  return { playRound };
}

const game = GameController();
