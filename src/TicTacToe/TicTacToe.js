import React, { useState } from "react";
import './TicTacToe.css';

const TicTacToe = () => {
    const [box, setBox] = useState([
        [null, null,null],
        [null, null,null],
        [null, null,null]
    ]);
    const [isXNext, setIsNext] = useState(true);
    const [winner, setWinner] = useState(null)
    
    const flattenBoard = (box) => {
        return box.flat();
    };
    const checkWinner = (box) => {
        const winnerCombination = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let combo of winnerCombination){
            const [a,b,c] = combo;
            if(box[a] && box[a] === box[b] && box[a] === box[c]){
                return box[a];
            }
        }
        return null;

    }
    const handleBoxClick = (e, rowIndex, colIndex) =>{
        e.stopPropagation();
        if(box[rowIndex][colIndex] !== null || winner){
            return;
        }
        const newBox = [...box];
        newBox[rowIndex][colIndex] = isXNext ? 'X' : 'O';
        setBox(newBox);
        setIsNext(!isXNext);
        const flatten = flattenBoard(newBox)
        const gameWinner = checkWinner(flatten);

        if (gameWinner) {
            setWinner(gameWinner);
        }
    }
    const reset = () => {
        setBox([
            [null, null,null],
            [null, null,null],
            [null, null,null]
        ]);
        setIsNext(true);
        setWinner(null);
    }

    return(
        <>
        <h1>Tic-Tac-Toe Game</h1>
        <div className="container">
        {box.map((row,rowIndex) => (
            <div key={rowIndex} className="rowC">
                {row.map((_, colIndex) => {
                  return <div key={colIndex} className="boxC" onClick={(e) => handleBoxClick(e, rowIndex, colIndex)}>
                        {box[rowIndex][colIndex]}
                    </div>}
                )}
            </div>
        ))}

        {winner ? (
                <div className="status">
                    <h2>Winner: {winner}</h2>
                </div>
            ) : (
                <div className="status">
                    <h2>Next Player: {isXNext ? "X" : "O"}</h2>
                </div>
            )}
           <button onClick={reset}>Reset</button>

        </div>
        </>
   
    )
}
export default TicTacToe;