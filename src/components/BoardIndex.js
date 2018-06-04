import React, { Component } from "react";
import PropTypes from "prop-types";
import BoardIndexView from "./BoardIndexView/BoardIndexView";

class BoardIndex extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    return <BoardIndexView handleCreate={this.onBoardCreate} />;
  }
}

export default BoardIndex;
