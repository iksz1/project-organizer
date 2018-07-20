import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import BoardView from "./BoardView";

class Board extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { store, match } = this.props;
    store.boardStore.fetchData(match.params.boardId);
  }

  render() {
    const { boardStore } = this.props.store;

    return <BoardView store={boardStore} />;
  }
}

export default inject("store")(observer(Board));
