import React from "react";

export type SquareProps = {
    value: number | string | null;
    onClick:(value: any) => void;
};

export const Square: React.FunctionComponent<SquareProps> = ({
    value,
    onClick
}) => {
    return (

        <button 
        className="square" 
        onClick={i => onClick(i)}
        >
        {value}
      </button> 
    )
};