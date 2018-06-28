import { Wrapper } from "./BoardView.sc";
import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "../UI/List/List";
import AddList from "../UI/AddItem/AddItem";
import { observer } from "mobx-react";
import { Container, Draggable } from "react-smooth-dnd";

class BoardView extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  onListDrop = ({ addedIndex, payload }) => {
    const { board } = this.props.store;
    //same as (index !== null && index !== undefined)
    if (addedIndex != null) {
      const { fromArr, fromIndex, list } = payload;
      board.moveList(list, { fromArr, fromIndex, toArr: fromArr, toIndex: addedIndex });
    }
  };

  movingListPayload = index => {
    const { lists } = this.props.store.board;
    return { fromArr: lists, fromIndex: index, list: lists[index] };
  };

  render() {
    const { board } = this.props.store;
    if (!board) return null;

    return (
      <Wrapper>
        <Container
          onDrop={this.onListDrop}
          getChildPayload={this.movingListPayload}
          dragClass="drag-class"
          groupName="lists"
          orientation="horizontal"
          dragBeginDelay={5}
          dragHandleSelector=".list-header"
          nonDragAreaSelector=".item-controls"
        >
          {board.lists.map(list => (
            <Draggable key={list.id}>
              <List list={list} onCardMove={board.moveCard} onListDelete={board.deleteList} />
            </Draggable>
          ))}
        </Container>
        <AddList onSubmit={board.addList} hint="add list" />
      </Wrapper>
    );
  }
}

export default observer(BoardView);
