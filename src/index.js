import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Board} from './components/Board.tsx';

//TODO not sure why, but can't auto resolve tsx extension. fix this!
function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return "Winner: " + squares[a];
      }
    }
    if (!squares.some((square)=>square === null)){
        return "Tie!";
    }
    return null;
  }


  

  const startingState = {
    history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber:0,
    xIsNext: true,}

  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = startingState;
      }

      handleClick(i){
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
    }

        jumpTo(step){
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            });
        }

        newGame(){
            this.setState(startingState);
        }

    render() {
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
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  