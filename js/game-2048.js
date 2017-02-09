function Game2048 () {
  this.score = 0;
  this.board = [
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
  ];
  this.hasWon = false;
  this.hasLost = false;

  this._generateTile(); //we type this twice so it generates two tiles, each being either 2 or 4
  this._generateTile();
}

Game2048.prototype._generateTile = function () {
  var tileValue;

  if(Math.random() < 0.8) { // means 80% of the time it will be a 2 and 20% of the time it will be a 4
    tileValue = 2;
  } else {
    tileValue = 4;
  }

  this._getAvailablePosition(); // tries to figure out what are the empty spaces in my board; its gonna give me a random empty position or null so save that to a var

  if (emptyTile !== null) {
    var row = emptyTile.x;
    var col = emptyTile.y;
    this.board[row][col] = tileValue;
  }
};

// I'm gonna loop through all the positions and check if they are empty, any that are empty are stored in emptyTiles

Game2048.prototype._getAvailablePosition = function () {
  var emptyTiles = [];

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        emptyTiles.push({x: rowIndex, y: colIndex}); // if it is add its coordinates to the array
      }
  });
});

if (emptyTiles.length === 0) { // sometimes there are no empty tiles
  return null;
}

var randomIndex = Math.floor(Math.random() * emptyTiles.length); // at the end of the this loop we want to pick one of those empty positions
  return emptyTiles[randomIndex]; // if I get 11 results for example I want to pick one at random and plug it into the emptyTiles array at the top of this prototype
};

Game2048.prototype._renderBoard = function () { // just prints out everything in each row
  this.board.forEach(function(row) {
    console.log(row);
  });
};
