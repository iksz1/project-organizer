import React, { Component } from "react";
import PropTypes from "prop-types";
import BoardView from "./BoardView/BoardView";
import { observer } from "mobx-react";
import store from "../stores/BoardStore";

@observer
class Board extends Component {
  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    store.fetchData(this.props.match.params.boardId);
  }

  render() {
    return store.board && <BoardView board={store.board} />;
  }
}

export default Board;
