const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

const game = new Game(ctx);


const startBtn = document.getElementById('startBtn');
const tryAgainBtn = document.getElementById('tryAgain');
const postcard = document.getElementById('postcard');


// start btn
startBtn.onclick = () => {
  startBtn.remove();
  postcard.remove();

  game.start();
};

// re-start btn
tryAgainBtn.onclick = () => {
  location.reload();
};


// EVENT LISTENERS
document.addEventListener('reload', () => {
  tryAgainBtn.classList.remove("hidden");
});

document.addEventListener('keydown', (event) => {
  game.onKeyDown(event.keyCode);
});

document.addEventListener('keyup', (event) => {
  game.onKeyUp(event.keyCode);
});

// don't scroll when arrow keys are pressed
var keys = {};
window.addEventListener("keydown",
  function(e){
    keys[e.keyCode] = true;
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
  },
false);

window.addEventListener('keyup',
  function(e){
      keys[e.keyCode] = false;
  },
false);