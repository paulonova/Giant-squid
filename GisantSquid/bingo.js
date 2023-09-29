const fs = require("fs");

console.log("****** BINGO ******");
console.log(" ");

function generateBoardFile(filename) {
  // Generate a shuffled list of numbers from 0 to 26
  const numbers = Array.from({ length: 27 }, (_, i) => i);
  const shuffledNumbers = shuffle(numbers);

  // Write the shuffled numbers to the file
  fs.writeFileSync(filename, shuffledNumbers.join(",") + "\n\n");

  // Generate 3 bingo boards and write them to the file
  for (let i = 0; i < 3; i++) {
      const boardNumbers = shuffle(numbers).slice(0, 25);  // 5x5 board, so 25 numbers
      for (let j = 0; j < 5; j++) {
          fs.appendFileSync(filename, boardNumbers.slice(j*5, (j+1)*5).join(" ") + "\n");
      }
      fs.appendFileSync(filename, "\n");
  }
}

function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}

// Generate the text file
generateBoardFile("boards01.txt");
generateBoardFile("boards02.txt");


function parseFile(path) {
  const content = fs.readFileSync(path, "utf8");
  const [numbersLine, ...boardLines] = content.trim().split("\n");

  const numbers = numbersLine.split(",").map(Number);
  const boards = [];

  let boardStart = 0;
  while (boardStart < boardLines.length) {
    const board = boardLines
      .slice(boardStart, boardStart + 5)
      .map((line) => line.split(/\s+/).map(Number));
    boards.push(board);
    boardStart += 6;  // 5 lines for a board + 1 extra line
  }

  return { numbers, boards };
}

function checkBoard(board) {
  // Check rows
  for (const row of board) {
    if (row.every((num) => num === null)) return true;
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (board.every((row) => row[col] === null)) return true;
  }

  return false;
}


function score(path) {
  const { numbers, boards } = parseFile(path);

  for (const num of numbers) {

    for (const board of boards) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (board[i][j] === num) {
            board[i][j] = null;
          }
        }
      }
    }
    for (const board of boards) {
      if (checkBoard(board)) {
          const unmarkedSum = board.flat().filter(n => n !== null).reduce((acc, n) => acc + n, 0);
          return unmarkedSum * num;
      }
    }
  }
  return null; // No board won

}


console.log("> score('boards01.txt')");
console.log(score("boards01.txt"));
console.log("> score('boards02.txt')");
console.log(score("boards02.txt")); 
