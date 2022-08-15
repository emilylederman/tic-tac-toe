import React from "react";

export type SquareProps = {
    value: number | string;
    onClickHandler: () => void;
};

export const Square: React.FunctionComponent<SquareProps> = ({
    value,
    onClickHandler
}) => {
    return (
        <button 
        className="square" 
        onClick={onClickHandler}
        >
        {value}
      </button> 
    )
};