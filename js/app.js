// 1. Create a new game when the player opens the browser/the page loads. AKA Create game object
  // When do we create the game object? When document ready AKA window.onload

var  myGlobalGame;

$(document).ready(function () {
  myGlobalGame = new Game2048();

  renderTiles(); // define to make use of the myGlobalGame function
});

// 2. Take the initial info in that object (tiles) and put them on the screen
  // There's really 2 boards: the board in the object and the board on the screen
  // Since there isn't a magical connection between the object and the screen we create that with code
  // we'll loop through every single cell in the board to do this

  function renderTiles () {
    $("#tile-container").empty(); // clears out existing tiles in the DOM 

    myGlobalGame.board.forEach(function (row, rowIndex) {
      row.forEach(function (cell, colIndex) {
        if (cell === null) {
          return;
        }
      // What to test at this point:
      // console.log("Tile value: " + cell);
      // console.log("Row " + rowIndex);
      // console.log("Column: " + colIndex);
      var tileHtml = '<div class="tile tile-position-' + rowIndex + '-' + colIndex + ' val-' + cell + '">' + cell +'</div>';
       $("#tile-container").append(tileHtml);

      });
    });
  }

// 3. Handle keyboard events

// 4. Move board in object based on keypresses (up, down, left, right)

// 5. Updating the screen based on the new board state

// 6. Win or Lose?
