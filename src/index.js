import React, { useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Peg from './Peg'

const root = ReactDOM.createRoot(document.getElementById('root'));

let captured = {
  row: null,
  col: null
};

const GameBoard = () => {
  const size = 5;
  const [board, setBoard] = useState([]);
  const dragStartRef = useRef(null);

  useEffect(() => {
    const game_board = Array.from({ length: size }, (_, rowIndex) => {
      return Array.from({ length: size }, (_, colIndex) => ({
        filled: !(rowIndex === 2 && colIndex === 2) // center is empty
      }));
    });
    setBoard(game_board);
  }, []);

  function isValidMove(fromRow, fromCol, destRow, destCol) {
    //check if move is 2 spaces and hops another peice

    //rows
    if (destRow - fromRow === 2){
      //down
      captured.row = (destRow + fromRow) / 2;
      captured.col = fromCol;
      return true;
    }
    if (fromRow - destRow === 2){
      //up
      captured.row = (fromRow + destRow) / 2;
      captured.col = fromCol;
      return true;
    }

    //columns 
    if (destCol - fromCol === 2) {
      //right
      captured.col = (destCol + fromCol) / 2;
      captured.row = fromRow;
      return true;
    }
    if (fromCol - destCol === 2) {
      //left
      captured.col = (fromCol + destCol) / 2;
      captured.row = fromRow;
      return true;
    }

    return false;
  }

  return (

    <>
      {board.length > 0 && board.map((row, row_index) => (
        <div className="row" key={row_index}>
          {row.map((cell, col_index) => {
            const isFilled = cell.filled;

            const handleDragStart = () => {
              dragStartRef.current = { row: row_index, col: col_index };
            };

            const handleDrop = () => {
              //index we're moving the peice from
              const from = dragStartRef.current;
              if (!from) return; //if theres nothing in the index then dont do anything

              const newBoard = board.map(row => row.map(cell => ({ ...cell }))); 
              //.map iterates over array abd returns jsx element for each item
              //in this case, we're returning the cell for each position on the board

              // Only allow pegs to hop over other pegs into whitespace
              if (
                newBoard[from.row][from.col].filled &&
                !newBoard[row_index][col_index].filled &&

                //checks to see if move is 2 spaces away from current position
                isValidMove(from.row, from.col, row_index, col_index, size)
              ) {
                newBoard[from.row][from.col].filled = false;
                newBoard[captured.row][captured.col] = false;
                newBoard[row_index][col_index].filled = true;
                setBoard(newBoard);
              }
            };

            return (
              <div
                key={col_index}
                className="box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Peg
                  color={isFilled ? 'blue' : 'white'}
                  draggable={isFilled}
                  onDragStart={handleDragStart}
                />
              </div>
            );
          })}
        </div>
      ))}

    </>
  );
};

function Title() {
  return(
    <div 
      style= {{display: 'flex', justifyContent: 'center'}}>
      peg-solitaire
    </div>
  )
}

root.render(
  <React.StrictMode>
    <Title />
    <GameBoard />
  </React.StrictMode>
);

