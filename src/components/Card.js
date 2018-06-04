import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./Card.scss";
import { observer } from "mobx-react";

@observer
class Card extends Component {
  static propTypes = {
    card: PropTypes.object,
    onCardDelete: PropTypes.func
  };

  handleDoubleClick = () => {
    // this.props.card.text = "kek";
    this.props.card.changeText("DOUBLE CLICKED!");
  };

  render() {
    const { card, onCardDelete } = this.props;
    return (
      <div className={style.card} onDoubleClick={this.handleDoubleClick}>
        {card.text}&nbsp;[{card.order}] <button onClick={() => card.changeText("kek!")}>U</button>
        <button onClick={() => onCardDelete(card)}>X</button>
      </div>
    );
  }
}

export default Card;
