import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nRows: number of rows of board
 * - nCols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nRows: 5,
    nCols: 5,
    changeLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    }

  }

  /** create a board nRows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    let {nRows, nCols, changeLightStartsOn} = this.props;

    // create array-of-arrays of true/false values
    for(let i = 0; i < nRows; i++) {
      let tempRow = [];

      for(let j = 0; j < nCols; j++) {
        tempRow.push(Math.random() <= changeLightStartsOn);
      }

      board.push(tempRow);
    }

    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    
    this.setState({board: board, hasWon: hasWon});
  }

  renderBoard() {
    let tblBoard = [];
    let {nRows, nCols} = this.props;

    for(let i = 0; i < nRows; i++) {
      let tempRow = [];

      for(let j = 0; j < nCols; j++) {
        let coord = `${j}-${i}`;
        tempRow.push(<Cell key={coord} isLit={this.state.board[j][i]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }

      tblBoard.push(<tr key={i}>{tempRow}</tr>);
    }

    
    return (
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    )
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    if(this.state.hasWon) {
      return <h1 className="winner"><span className="neon-orange">You</span> <span className="neon-blue">Win!</span></h1>;
    }

    // TODO
    return (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        {this.renderBoard()}
      </div>
    );
    

    // TODO
  }
}


export default Board;
