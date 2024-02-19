function solveSudoku(board) {
    if (!isValidSudoku(board)) {
      return "Invalid Sudoku board";
    }
  
    if (isSudokuSolved(board)) {
      return board;
    }
  
    const emptyCell = findEmptyCell(board);
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(board, row, col, num)) {
        board[row][col] = num;
  
        if (solveSudoku(board)) {
          return board;
        }
  
        // If placing the current number doesn't lead to a solution, backtrack
        board[row][col] = 0;
      }
    }
  
    // No valid number found, trigger backtracking
    return false;
  }
  
  function isValidSudoku(board) {
    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      if (!isValidRow(board, i) || !isValidColumn(board, i)) {
        return false;
      }
    }
  
    // Check 3x3 sub-boxes
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        if (!isValidSubBox(board, i, j)) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function isValidRow(board, row) {
    const set = new Set();
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== 0) {
        if (set.has(num)) {
          return false;
        }
        set.add(num);
      }
    }
    return true;
  }
  
  function isValidColumn(board, col) {
    const set = new Set();
    for (let row = 0; row < 9; row++) {
      const num = board[row][col];
      if (num !== 0) {
        if (set.has(num)) {
          return false;
        }
        set.add(num);
      }
    }
    return true;
  }
  
  function isValidSubBox(board, startRow, startCol) {
    const set = new Set();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const num = board[startRow + row][startCol + col];
        if (num !== 0) {
          if (set.has(num)) {
            return false;
          }
          set.add(num);
        }
      }
    }
    return true;
  }
  
  function isSudokuSolved(board) {
    // Checking if the Sudoku board is solved
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
  
  function findEmptyCell(board) {
    // Findong the first empty cell in the Sudoku board
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  }
  
  function isValidPlacement(board, row, col, num) {
    // Checking if 'num' is not present in the current row, column, and sub-box
    return (
      !usedInRow(board, row, num) &&
      !usedInColumn(board, col, num) &&
      !usedInSubBox(board, row - (row % 3), col - (col % 3), num)
    );
  }
  
  function usedInRow(board, row, num) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInColumn(board, col, num) {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInSubBox(board, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[startRow + row][startCol + col] === num) {
          return true;
        }
      }
    }
    return false;
  }
  
  // Example usage:
  const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];
  
  const solvedSudoku = solveSudoku(sudokuBoard);
  console.log(solvedSudoku);
  