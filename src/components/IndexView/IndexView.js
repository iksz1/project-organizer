import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Wrapper, MainBlock, BoardList } from "./IndexView.sc";
import AddItem from "../UI/AddItem/AddItem";
import ListItem from "./ListItem";

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
                <Link to={`/boards/${board.id}`}>
                  <ListItem board={board} onDelete={deleteBoard} />
                </Link>
              </li>
            ))}
          </BoardList>
        </MainBlock>
      </Wrapper>
    );
  }
}

export default observer(IndexView);
