const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartBtn = document.querySelector('#restart');

const spaces = [];
const tick_circle = 'O';
const tick_x = 'X';
let currentPlayer = tick_circle;

const drawBoard = () => {
  boxes.forEach((box, i) => {
    let styleString = '';
    if (i < 3) {
      styleString += 'border-bottom: 3px solid black;';
    }
    if (i % 3 === 0) {
      styleString += 'border-right: 3px solid black;';
    }
    if (i % 3 === 2) {
      styleString += 'border-left: 3px solid black;';
    }
    if (i > 5) {
      styleString += 'border-top: 3px solid black;';
    }
    box.style = styleString;
    box.addEventListener('click', boxClicked);
  });
};

const boxClicked = (e) => {
     
    // if(currentPlayer===tick_x)
    // {
    //     Computer();
    // }
    // else    
    // {
        const id = e.target.id;
        console.log(e);
        if (!spaces[id])
        {
        console.log(spaces[id]);
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        }
    //}

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      restart();
      return;
    }

    if (playerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
    

};

 // Computer move
 function Computer() 
 {
    const emptyCells = spaces.reduce((acc, cell, index) => {
      if (cell === '') acc.push(index);
      return acc;
    }, []);

    let bestMove = -1;
    let bestScore = -Infinity;

    emptyCells.forEach(cellIndex => {
    spaces[cellIndex] = currentPlayer;
      const score = minimax(spaces, 0, false);
      spaces[cellIndex] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = cellIndex;
      }

    });

    spaces[bestMove] = currentPlayer;
    currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
    console.log(spaces);
  }

  function minimax(spaces, depth, isMaximizing) {

    if (isMaximizing) {
      let bestScore = -Infinity;
      spaces.forEach((cell, index) => {
        if (cell === '') {
          spaces[index] = 'X';
          const score = minimax(spaces, depth + 1, false);
          spaces[index] = '';
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      spaces.forEach((cell, index) => {
        if (cell === '') {
          spaces[index] = 'X';
          const score = minimax(spaces, depth + 1, true);
          spaces[index] = '';
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  }



const playerWon = () => {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins up to top`;
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the left`;
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the right`;
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the bottom`;
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins vertically on middle`;
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
      return true;
    }
    if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
};

const playerDraw = () => {
  let draw = 0;
  spaces.forEach((space, i) => {
    if (spaces[i] !== null) draw++;
  });
  if (draw === 9) {
    text.innerText = `Draw`;
    restart();
  }
};

const restart = () => {
  setTimeout(() => {
    spaces.forEach((space, i) => {
      spaces[i] = null;
    });
    boxes.forEach((box) => {
      box.innerText = '';
    });
    text.innerText = `Play time`;
    strategy.innerText = ``;
  }, 1000);
};
restartBtn.addEventListener('click', restart);
restart();
drawBoard();