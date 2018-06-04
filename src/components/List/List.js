import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./List.scss";
import Card from "../Card";
import { Container, Draggable } from "react-smooth-dnd";
import AddCard from "../AddCard";
import { observer } from "mobx-react";

// @inject("store")
@observer
class List extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    onListDelete: PropTypes.func,
    onCardMove: PropTypes.func
  };

  onCardDrop = ({ addedIndex, payload }) => {
    const { list, onCardMove } = this.props;
    //same as (index !== null && index !== undefined)
    if (addedIndex != null) {
      const { fromList, fromIndex, card } = payload;
      console.log(`Received from list/index: ${fromList}/${fromIndex}`);
      console.log(`Added to index: ${addedIndex}`);
      // if (fromList === list.id && fromIndex === addedIndex) return; //exit if position hasn't changed
      onCardMove(card, { fromList, fromIndex, toList: list.id, toIndex: addedIndex });
    }
  };

  movingCardPayload = index => {
    const list = this.props.list;
    return { fromList: list.id, fromIndex: index, card: list.cards[index] };
  };

  render() {
    const { list, onListDelete } = this.props;
    // const cards = this.props.store.cards.filter(card => card.listId === list.id);

    return (
      <div className={style.list}>
        <div className={style.header}>
          {list.name}&nbsp;
          <button onClick={() => list.changeName("kek")}>U</button>
          <button onClick={() => onListDelete(list)}>X</button>
        </div>
        <div>
          {/* <ul style={{ margin: 0, padding: 0, listStyle: "none" }}> */}
          <Container
            onDrop={this.onCardDrop}
            getChildPayload={this.movingCardPayload}
            dragClass={style.dragClass}
            groupName="list"
          >
            {list.cards.map(card => (
              <Draggable key={card.id}>
                <Card key={card.id} card={card} onCardDelete={list.deleteCard} />
              </Draggable>
            ))}
          </Container>
          <AddCard handleAction={list.addCard} />
          {/* </ul> */}
        </div>
      </div>
    );
  }
}

export default List;
