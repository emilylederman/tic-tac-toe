import React, { useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Board} from './components/Board.tsx';
import { PlayerIcon } from './components/Player.tsx';
import { useWinnerCalculationOnBoard } from './hooks/calculateWinner.ts';

//TODO not sure why, but can't auto resolve tsx extension. fix this!


  
/* 
  const startingState = {
    history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber:0,
    xIsNext: true,}
 */
  function Game() {
/*     constructor(props) {
        super(props);
        this.state = startingState;
      } */

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
      console.log("board tiles:", boardTiles)

      /*handleClick(i){
        const history = this.state.history.slice(0, 
            this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
              }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    };
*/
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
        currBoard[boardIndex] = currentPlayer.string
        setBoardTiles(currBoard)
        // add the current board to history
        setHistory(history => [...history, [boardTiles]])

        // if current player is X, set to O. else, set current player to X.
        setCurrentPlayer(currentPlayer === PlayerIcon.X? PlayerIcon.O: PlayerIcon.X)
        console.log(currBoard, boardTiles)
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
      [startingPlayer],
      );

      let status;
      winner ? status = winner: status = 'Next player: ' + (currentPlayer === PlayerIcon.X? "O": "X");

      // And now, the buttons...
      const undoButton = <button onClick={() => 
        this.state.stepNumber === 0 || winner?
        null :
        this.jumpTo(this.state.stepNumber - 1)}>
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


    /*   
        jumpTo(step){
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            });
        }

        newGame(){
            this.setState(startingState);
        } */

    /* render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        winner ? status = winner: status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
         const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
        const undo = <button onClick={() => 
            this.state.stepNumber === 0 || winner?
            null :
            this.jumpTo(this.state.stepNumber - 1)}>
                {"Undo"}</button>

        const newGame = <button
        onClick={() => this.newGame()}>{
            winner ? "New game" :
            "Restart"
        }</button>
      return (
        
        <><h1>Tic-Tac-Toe Practice</h1><div className="game">
              <div className="game-board">
                  <Board
                      squares={current.squares}
                      onClick={(i) => this.handleClick(i)} />
              </div>
              <div className="game-info">
                  <div>{status}</div>
                  <div>{undo}</div>
                  <div>{newGame}</div>
              </div>
          </div></>
      );
    } */
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  