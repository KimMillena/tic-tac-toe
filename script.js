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

function GameController() {}
