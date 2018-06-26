import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import BoardView from "./BoardView/BoardView";

class Board extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.object
  };

  componentDidMount() {
    const boardStore = this.props.store.board;
    boardStore.fetchData(this.props.match.params.boardId);
  }

  render() {
    const boardStore = this.props.store.board;

    return <BoardView store={boardStore} />;
  }
}

export default inject("store")(observer(Board));
