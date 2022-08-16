import React from "react";
import { Square } from "./Square.tsx";

export type BoardProps = {
    boardTiles: any[];
    onClick: (boardIndex: any) => void;
};

export const Board: React.FunctionComponent<BoardProps> = ({
    boardTiles,
    onClick,
}) => 
    {
    console.log("board:", boardTiles)
    console.log(onClick)
    function renderSquare(squareIndex){
        return(
            <Square
                value={boardTiles?.[squareIndex]}
                onClick ={() => onClick(squareIndex)}
            />)}
    
    return(
        <div>
            <div className='board-row'> 
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
  };
  