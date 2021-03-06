import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "../../UI/List";
import AddList from "../../UI/AddItem";
import { observer } from "mobx-react";
import { Container, Draggable } from "react-smooth-dnd";
import styled, { keyframes } from "styled-components";

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: auto;
  overflow: auto;
  padding: 0.5em;
  will-change: transform, opacity;
  animation: ${appear} 1s ease;
  animation-delay: 200ms;
  animation-fill-mode: backwards;
`;

class BoardView extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  onListDrop = ({ addedIndex, payload }) => {
    const { board } = this.props.store;
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
          dragHandleSelector=".draggable"
          nonDragAreaSelector=".non-draggable"
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
