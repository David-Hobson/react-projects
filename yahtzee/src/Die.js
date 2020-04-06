import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"]
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt){
    this.props.handleClick(this.props.idx);
  }

  render() {
    let diceIcon = `fas fa-dice-${this.props.numberWords[this.props.val - 1]} fa-5x`;
    let diceLocked = this.props.locked ? "Die-locked" : null;
    let diceRolling = this.props.rolling && !this.props.locked ? "Die-rolling" : null;

    return (
      <i
        className={`Die ${diceIcon} ${diceLocked} ${diceRolling}`}
        onClick={this.handleClick}
        disabled={this.props.disabled}
      >
      </i>
    );
  }
}

export default Die;
