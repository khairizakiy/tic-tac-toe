import { useState } from 'react'



function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(squares)) return; // Prevent further clicks if X is next

    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `PEMENANGNYA "${winner}" GILA JAGO BANGET LU JOIN TUR KABUPATEN GAS`;
  } else {
    status = `${xIsNext ? "X" : "O"} LANJUT ANJENG`;
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [xIsNext, setSquares] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  
  function jumpTo(move) {
    setCurrentMove(move);
    setSquares(move % 2 === 0); // Set xIsNext based on the move number
    setHistory(history.slice(0, move + 1)); // Trim history to the current move
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); // Update current move to the last move
    setSquares(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if (move > 0) {
      description = `Langkah #` + move;
    } else {
      description = 'Permainan dimulai';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  }
  );

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // "a disamain dengan b, sama gak? trus a disamain lagi sama c, sama gak? dua-duanya true? berarti menang. Gitu anjing."

  return null;
}