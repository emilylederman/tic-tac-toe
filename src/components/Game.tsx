import React, { useCallback } from "react";
import { useWinnerCalculationOnBoard } from "../hooks/calculateWinner.ts";
import { Board } from "./Board.tsx";
import {PlayerIcon} from "./Player.tsx"

export type GameProps = {

};

export const Game: React.FunctionComponent<GameProps> = () => {
          // state variables: 
          const [winner, calculateWinner] = useWinnerCalculationOnBoard();
          const [boardTiles, setBoardTiles] = React.useState(Array(9).fill(null));
          const [moveNumber, setMoveNumber] = React.useState(0) ;
          const [history, setHistory] = React.useState([Array(9).fill(null)]);
          const [startingPlayer, setStartingPlayer] = React.useState(PlayerIcon.X);
          const [currentPlayer, setCurrentPlayer] = React.useState(PlayerIcon.X);
    
          React.useEffect(() => {
            calculateWinner(boardTiles)
          }, [boardTiles, calculateWinner]);
          
          const handleClick = React.useCallback((boardIndex) => {
            // add a new state history for the new move
            // setHistory(history => [...history, ])
            // if there's a winner, or there is already a value in the tile at boardIndex, then return
            // can this be disabled using state?
            console.log("click");
            const currBoard = [...boardTiles]
            if( winner|| currBoard[boardIndex]){
              return;
            }
            // if the move is valid, then set it
            currBoard[boardIndex] = currentPlayer
            setBoardTiles(currBoard)
            // add the current board to history
            setHistory(history => [...history, [boardTiles]])
    
            // if current player is X, set to O. else, set current player to X.
            setCurrentPlayer(currentPlayer === PlayerIcon.X? PlayerIcon.O: PlayerIcon.X)
          },
          [boardTiles, currentPlayer, winner],
          );
    
          const jumpTo = useCallback((step) => {
            setMoveNumber(step);
            //if an even move, set current player to starting player. else, the non starting player
            if (step % 2 === 0){
              setCurrentPlayer(startingPlayer);
            }
            else{
              setCurrentPlayer(startingPlayer === PlayerIcon.X? PlayerIcon.O: PlayerIcon.X)
            }
          },
          [startingPlayer],
          );
    
          const newGame = useCallback(() => {
            setHistory([Array(9).fill(null)]);
            setBoardTiles(Array(9).fill(null));
            calculateWinner(boardTiles)
            console.log("reset board tiles")
            // if next player is X, new nextplayer should be O, and vice versa
            if(startingPlayer === PlayerIcon.X){
              setStartingPlayer(PlayerIcon.O);
              setCurrentPlayer(PlayerIcon.O);
            }
            else{
              setStartingPlayer(PlayerIcon.X);
              setCurrentPlayer(PlayerIcon.X); 
            }
            setMoveNumber(0);
          },
          [boardTiles, calculateWinner, startingPlayer],
          );
    
          let status;
          winner ? status = winner: status = 'Next player: ' + (currentPlayer === PlayerIcon.X? "X": "O");
    
          // And now, the buttons...
          // TODO fix this
          const undoButton = <button onClick={() => 
            moveNumber === 0 || winner?
            null :
            jumpTo(moveNumber - 1)}>
                {"Undo"}</button>
    
        const newGameButton = <button
        onClick={newGame}>{
            winner ? "New game" :
            "Restart"
        }</button>
    
          return(
            <div>
            <><h1>Tic-Tac-Toe Practice</h1><div className="game">
                  <div className="game-board">
                      <Board
                          boardTiles={boardTiles}
                          onClick={handleClick} />
                  </div>
                  <div className="game-info">
                      <div>{status}</div>
                      <div>{undoButton}</div>
                      <div>{newGameButton}</div>
                  </div>
              </div></>
            </div>
          );
    
}