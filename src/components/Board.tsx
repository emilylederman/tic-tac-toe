import React from "react";
import { WatchIgnorePlugin } from "webpack";
import { Square } from "./Square.tsx";

export type BoardProps = {
    squares: Array<number>;
    onClick: (number) => void;
};

export const Board: React.FunctionComponent<BoardProps> = ({
    squares,
    onClick,
}) => 
    {
    var i,j=0;
    var numRows=3;
    let boardDiv: Array<any> = [];
    while(i<3){
        // boardDiv = boardDiv.concat("<div className='board-row'>")
        while(j<3){
        const squareVal = (i*numRows) + j
        boardDiv = boardDiv.concat(<Square
        value={squareVal}
        onClickHandler={() => onClick(squareVal)}/>)
        }
        // boardDiv.concat("</div>")
    };
    return(
        <div>
            <div className='board-row'>
            {boardDiv.slice(0,3)}
            </div>
            <div className='board-row'>
            {boardDiv.slice(3,6)}
            </div>
            <div className='board-row'>
            {boardDiv.slice(6,9)}
            </div>
        </div>
    )
  };
  