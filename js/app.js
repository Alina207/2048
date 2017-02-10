// 1. Create Game Object
  //  Create a new game when the player opens the browser/the page loads. AKA Create game object
  // When do we create the game object? When document ready AKA window.onload

var  myGlobalGame;

$(document).ready(function () {
  myGlobalGame = new Game2048();

// 2. Take the initial tiles and put them on the screen
  // Take the initial info in that object (tiles) and put them on the screen define to make use of the myGlobalGame function
  renderTiles();
  loadSounds();

// 3. handle keyboard events
  $(document).keydown(moveGame);
  });

  // prevent arrow key scrolling
  function moveGame (ev) {
    var acceptableKeys = [ 37, 65, 38, 87, 39, 68, 40, 83 ];

    if (!acceptableKeys.includes(ev.keyCode)) {
      return;
    }

    // prevent arrow key scrolling
    ev.preventDefault();

    // 4. move board in object based on keypresses (up, down, left, right)
    // move if correct keys were pressed
    switch (ev.keyCode) {
      case 37:  // left arrow
      case 65:  // a
        myGlobalGame.move('left');
        break;
      case 38:  // up arrow
      case 87:  // w
        myGlobalGame.move('up');
        break;
      case 39:  // right arrow
      case 68:  // d
        myGlobalGame.move('right');
        break;
      case 40:  // down arrow
      case 83:  // s
        myGlobalGame.move('down');
        break;
    }
    // 5. updating the screen based on new board state
    renderTiles();
    updateScore();

    // 6. win or lose
    checkIfDone();
  }

  function updateScore () {
    $('#score-display').html(myGlobalGame.score);
  }

  function checkIfDone () {
    if (myGlobalGame.hasWon) {
      $('#game-board').remove();
      var winnerHtml = '<img src="https://media.giphy.com/media/xTiTnz33weTH3K8Uvu/giphy.gif" alt="Winner">';
      $('#container').append(winnerHtml);
    }

    else if (myGlobalGame.hasLost) {
      $('#game-board').remove();
      var loserHtml = '<img src="https://media.giphy.com/media/l3q2K12v7LgvwlATC/giphy.gif" alt="Loser">';
      $('#container').append(loserHtml);
    }
  }

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

      // put cell on the screen
      var tileHtml = '<div class="tile tile-position-' + rowIndex + '-' + colIndex + ' val-' + cell + '"> ' + cell + ' </div>';
      $('#tile-container').append(tileHtml);
    });
  });
}

// Sounds file "recipe"

function loadSounds () {
  ion.sound({
    sounds: [{name: "snap"}, {name: "tap"}, {name: "beer_can_opening"}],

    path: "../lib/ion.sound/sounds/",
    preload: true,
    volume: 1.0
  });
}

// Also need to put loadSounds(); in the $(document).ready(function () to "prepare the food"
// See movement section in game-2048.js file for how to "eat the food" aka call the method
