import React from "react";

//todo change to hook? 
export function useWinnerCalculationOnBoard(): [string, (squares: any) => void] {
    const [winner, setWinner] = React.useState("");

      const calculateWinner = React.useCallback(squares => {
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
            if (squares?.[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              setWinner("Winner: " + squares[a]);
            }
          }
          if (squares && !squares.some((square)=>square === null)){
              setWinner("Tie!");
          }
      }, [])
        console.log(winner)
      return [winner, calculateWinner];
    }
  