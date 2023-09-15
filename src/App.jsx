import { useState } from 'react';
import Square from './Components/Square';
// import './App.css';

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull(squares)) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = i => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  };

  const isWinningSquare = i => {
    return getWinnersSquare(squares)?.includes(i);
  };

  return (
    <div>
      <div className='status'>{status}</div>

      {/* Use two loops to make the squares */}

      {[0, 1, 2].map(row => {
        return (
          <div key={row} className='board-row'>
            {[0, 1, 2].map(col => {
              const i = row * 3 + col;
              return (
                <Square
                  key={i}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                  isWinningSquare={isWinningSquare(i)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [toggle, setToggle] = useState(true);

  const handlePlay = nextSquares => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = nextMove => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    // For the current move only, show “You are at move #…” instead of a button.
    if (move === currentMove) {
      return <li key={move}>{`You are at move #${move}`}</li>;
    }

    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div>
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? 'Ascendant' : 'Descendant'}
        </button>
        <ol>{toggle ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
};

export default App;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}

function getWinnersSquare(squares) {
  const winner = calculateWinner(squares);
  if (!winner) return null;

  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      squares[a] === winner &&
      squares[b] === winner &&
      squares[c] === winner
    ) {
      return lines[i];
    }
  }

  return null;
}
