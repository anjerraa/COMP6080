import React, { useState } from 'react';
import './App.css';

const SIZE = 3;

function App() {
  const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState('O');
  const [winningSquares, setWinningSquares] = useState([]);
  const [winner, setWinner] = useState('');

  //Handles local storage win counts
  const setWinCount = (winPlayer) => {
    if (winPlayer === 'X'){
      let winCount = localStorage.getItem("player_X_win_count");
      localStorage.setItem("player_X_win_count", winCount ? parseInt(winCount) + 1 : 1);
    } else {
      let winCount = localStorage.getItem("player_O_win_count");
      localStorage.setItem("player_O_win_count", winCount ? parseInt(winCount) + 1 : 1);
    }
  }

  const checkWinner = () => {
    // 1. check the rows
    for (let r = 0; r < SIZE; r++) {
      let count = 0;
      let coordinates = [];
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === player) {
          count++;
          coordinates.push([r, c]);
        }
      }
      if (count === SIZE) {
        setWinningSquares(coordinates);
        return true;
      }
    }

    // 2. check the columns
    for (let c = 0; c < SIZE; c++) {
      let count = 0;
      let coordinates = [];
      for (let r = 0; r < SIZE; r++) {
        if (board[r][c] === player) {
          count++;
          coordinates.push([r, c]);
        }
      }
      if (count === SIZE) {
        setWinningSquares(coordinates);
        return true;
      }
    }

    // 3. check the diagonals
    let count = 0;
    let coordinates = [];
    for (let i = 0; i < SIZE; i++) {
      if (board[i][i] === player) {
        count++;
        coordinates.push([i, i]);
      }
    }
    if (count === SIZE) {
      setWinningSquares(coordinates);
      return true;
    }

    count = 0;
    coordinates = [];
    for (let r = 0, c = SIZE - 1; r < SIZE && c >= 0; r++, c--) {
      if (board[r][c] === player) {
        count++;
        coordinates.push([r, c]);
      }
    }
    if (count === SIZE) {
      setWinningSquares(coordinates);
      return true;
    }

    return false;
  }

  const setSquare = (r, c) => {
    if (board[r][c] !== "") return;
    let newBoard = board;
    newBoard[r][c] = player;
    setBoard(newBoard);
    if (checkWinner()) {
      setWinner(player);
      setWinCount(player);
    }
    setPlayer(player === "O" ? "X" : "O");
  }

  const checkWinningSquare = (r, c) => {
    if (winningSquares.some(square => square[0] === r && square[1] === c)) {
      return 'win-square';
    }
    return 'normal-square';
  }

  return (
    <div className="App">
      <div id="board">
        {board.map((row, r) => {
          return (
            <div 
              className='row'
              key={`row-${r}`}
            >
              {row.map((value, c) => {
                return (
                  <div 
                    className={checkWinningSquare(r, c)}
                    onClick={() => setSquare(r, c)}
                    key={`square-(${r},${c})`}
                  >
                    {value}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <h3 id="winner">WINNER: {winner}</h3>
    </div>
  );
}

export default App;
