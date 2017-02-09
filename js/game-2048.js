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

  var emptyTile = this._getAvailablePosition(); // tries to figure out what are the empty spaces in my board; its gonna give me a random empty position or null so save that to a var

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

Game2048.prototype.moveLeft = function () {
  var updatedBoard = [];

  this.board.forEach(function (row) {
    //1. Remove empties from row; remove the item if its null
    var newRow = [];

    row.forEach(function (cell) {
      if (cell !== null) {
        newRow.push(cell);
      }
    });

    //2. Merge tiles that are together and same #

    for (var i = 0; i < newRow.length; i += 1) {
      if (newRow[i] === newRow[i +1]) {
      newRow[i] *= 2;
      newRow[i+1] = null;
    }
  }

  // 3. Remove new empties in the middle
  //     e.g. when step #2 turns [8, 8, 4] into [16, null, 4]
  //          we want to end up with [16, 4]
  var moved = [];

  newRow.forEach(function (cell) {
    if (cell !== null) {
      moved.push(cell);
    }
  });


  // 4. push() nulls until row has length 4 again
  while (moved.length < 4) {
    moved.push(null);
  }

  updatedBoard.push(moved);
});

this.board = updatedBoard;
};

// to TEST:

// alinasGame = new Game2048();
// alinasGame._renderBoard();
// alinasGame.moveLeft();
// alinasGame._renderBoard();
