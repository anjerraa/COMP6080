import React, { useState } from 'react';
import './App.css';

function App() {
  const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState('O');
  const [winningSquares, setwinningSquares] = useState([]);
  const [winner, setWinner] = useState('');

  const checkWinner = () => {
    if (checkWinConditions('O')) {
      setWinner('O');
    } else if (checkWinConditions('X')) {
      setWinner('X');
    }
  }

  const checkWinConditions = (player) => {
    // Check rows
    for (const r in board) {
      let count = 0;
      let coordinates = [];
      for (const c in board[r]) {
        if (board[r][c] === player) {
          count++;
          coordinates.push([r, c]);
        }
      }
      if (count === 3) {
        setwinningSquares(coordinates);
        return true;
      }
    }

    // Check columns
    for (const c in board) {
      let count = 0;
      let coordinates = [];
      for (const r in board[c]) {
        if (board[r][c] === player) {
          count++;
          coordinates.push([r, c]);
        }
      }
      if (count === 3) {
        setwinningSquares(coordinates);
        return true;
      }
    }

    // Check diagonals
    // (0,0) (1,1) (2,2)
    let count = 0;
    let coordinates = [];
    for (const i in board) {
      if (board[i][i] === player) {
        count++;
        coordinates.push([i, i]);
      }
    }
    if (count === 3) {
      setwinningSquares(coordinates);
      return true;
    }

    // (0,2) (1,1) (2,0)
    count = 0;
    coordinates = [];
    for (let r = 0, c = board[0].length - 1; r < board[0].length && c >= 0; r++, c--) {
        if (board[r][c] === player) {
          count++;
          coordinates.push([r, c]);
        }
    }
    if (count === 3) {
      setwinningSquares(coordinates);
      return true;
    }

    return false;
  }

  const setSquare = (r, c) => {
    if (board[r][c] !== "") return;
    let newBoard = board;
    newBoard[r][c] = player;
    setBoard(newBoard);
    checkWinner();
    setPlayer(player === "O" ? "X" : "O");
  }

  const checkWinningCell = (r, c) => {
    let win = false;
    winningSquares.forEach((s) => {
      if (s[0] === r && s[1] === c) win = true;
    })
    return win === true? 'win' : 'normal';
  }

  return (
    <div className="App">
      <div id="board">
        {board.map((row, r) => {
          return (
            <div className="row">
              {row.map((value, c) => {
                return (
                  <button className={checkWinningCell(r, c)} onClick={() => setSquare(r, c)}>{value}</button>
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
