const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.values.timerId);
    alert(`Game Over! O seu resultado foi: ${state.values.result}`);
  }
}

const playSound = (audioName) => {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.05;
  audio.play();
};

const randomSquare = () => {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let squareRandomEnemy = state.view.squares[randomNumber];
  squareRandomEnemy.classList.add("enemy");
  state.values.hitPosition = squareRandomEnemy.id;
};

const moveEnemy = () => {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
};

const hitBox = () => {
  state.view.squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
};

const init = function () {
  moveEnemy();
  hitBox();
};

init();
