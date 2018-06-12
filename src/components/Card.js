import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./Card.scss";
import { observer } from "mobx-react";
import EditForm from "./EditForm";
import EditIcon from "react-icons/lib/md/mode-edit";
import DeleteIcon from "react-icons/lib/md/delete";

@observer
class Card extends Component {
  static propTypes = {
    card: PropTypes.object,
    onCardDelete: PropTypes.func
  };

  state = {
    editMode: false
  };

  toggleEditMode = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleDoubleClick = () => {
    this.props.card.changeText("DOUBLE CLICKED!");
  };

  handleUpdate = text => {
    this.props.card.changeText(text);
    this.toggleEditMode();
  };

  render() {
    const { card, onCardDelete } = this.props;
    const editMode = this.state.editMode;

    if (editMode) {
      return (
        <EditForm text={card.text} onSubmit={this.handleUpdate} onCancel={this.toggleEditMode} />
      );
    }

    return (
      <div className={style.card} onDoubleClick={this.handleDoubleClick}>
        {card.text}
        <div className={`${style.controls} dont-drag`}>
          <button onClick={this.toggleEditMode}>
            <EditIcon />
          </button>
          <button onClick={() => onCardDelete(card)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }
}

export default Card;
