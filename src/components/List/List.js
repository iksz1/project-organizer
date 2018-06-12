import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import style from "./List.scss";
import Card from "../Card";
import { Container, Draggable } from "react-smooth-dnd";
import AddCard from "../AddCard";
import EditForm from "../EditForm";
import EditIcon from "react-icons/lib/md/mode-edit";
import DeleteIcon from "react-icons/lib/md/delete";

@observer
class List extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    onListDelete: PropTypes.func,
    onCardMove: PropTypes.func
  };

  state = {
    editMode: false
  };

  toggleEditMode = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleUpdate = name => {
    this.props.list.changeName(name);
    this.toggleEditMode();
  };

  onCardDrop = ({ addedIndex, payload }) => {
    const { list, onCardMove } = this.props;
    //same as (index !== null && index !== undefined)
    if (addedIndex != null) {
      const { fromArr, fromIndex, card } = payload;
      onCardMove(card, { fromArr, fromIndex, toArr: list.cards, toIndex: addedIndex });
    }
  };

  movingCardPayload = index => {
    const cards = this.props.list.cards;
    return { fromArr: cards, fromIndex: index, card: cards[index] };
  };

  render() {
    const { list, onListDelete } = this.props;
    const editMode = this.state.editMode;

    return (
      <div className={style.list}>
        {!editMode && (
          <div className={style.header}>
            {list.name}
            <div className={`${style.controls} dont-drag`}>
              <button onClick={this.toggleEditMode}>
                <EditIcon />
              </button>
              <button onClick={() => onListDelete(list)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        )}
        {editMode && (
          <EditForm text={list.name} onSubmit={this.handleUpdate} onCancel={this.toggleEditMode} />
        )}
        <div>
          <Container
            onDrop={this.onCardDrop}
            getChildPayload={this.movingCardPayload}
            dragClass={style.dragClass}
            groupName="cards"
            dragBeginDelay={5}
            nonDragAreaSelector=".dont-drag"
          >
            {list.cards.map(card => (
              <Draggable key={card.id}>
                <Card key={card.id} card={card} onCardDelete={list.deleteCard} />
              </Draggable>
            ))}
          </Container>
          <AddCard onSubmit={list.addCard} />
        </div>
      </div>
    );
  }
}

export default List;
