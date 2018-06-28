import { Wrapper, StyledList, StyledListItem } from "./IndexView.sc";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import AddItem from "../UI/AddItem/AddItem";
import ListItem from "./ListItem";

class IndexView extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const { boards, addBoard, deleteBoard } = this.props.store;

    return (
      <Fragment>
        <AddItem onSubmit={addBoard} hint="add board" />
        <Wrapper>
          <StyledList>
            {boards.map(board => (
              <StyledListItem key={board.id}>
                <ListItem board={board} onDelete={deleteBoard} />
              </StyledListItem>
            ))}
          </StyledList>
        </Wrapper>
      </Fragment>
    );
  }
}

export default observer(IndexView);
