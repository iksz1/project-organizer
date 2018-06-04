import React, { Component } from "react";
import PropTypes from "prop-types";
import BoardView from "./BoardView/BoardView";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Board extends Component {
  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  };

  componentDidMount() {
    const { store, match } = this.props;
    store.fetchData(match.params.boardId);
  }

  render() {
    const { board } = this.props.store;
    return board && <BoardView board={board} />;
  }
}

export default Board;
