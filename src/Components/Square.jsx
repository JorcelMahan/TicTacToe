const Square = ({ value, onSquareClick, isWinningSquare }) => {
  const className = 'square' + (isWinningSquare ? ' winning' : '');

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
