import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import AddItem from "../UI/AddItem/AddItem";
import ListItem from "./ListItem";
import styled, { keyframes } from "styled-components";

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Wrapper = styled.div`
  padding: 0.5em;
`;

const MainBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  will-change: transform, opacity;
  animation: ${appear} 1s ease;
  animation-delay: 200ms;
  animation-fill-mode: backwards;
`;

const BoardList = styled.ul`
  margin: 0;
  padding: 0;
  width: 300px;
  list-style: none;
`;

class IndexView extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const { boards, addBoard, deleteBoard } = this.props.store;

    return (
      <Wrapper>
        <AddItem onSubmit={addBoard} hint="add board" />
        <MainBlock>
          <BoardList>
            {boards.map(board => (
              <li key={board.id}>
                <ListItem board={board} onDelete={deleteBoard} />
              </li>
            ))}
          </BoardList>
        </MainBlock>
      </Wrapper>
    );
  }
}

export default observer(IndexView);
