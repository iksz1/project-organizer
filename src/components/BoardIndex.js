import React, { Component } from "react";
import BoardIndexView from "./BoardIndexView/BoardIndexView";
import { observer } from "mobx-react";
import store from "../stores/BoardIndexStore";

@observer
class BoardIndex extends Component {
  componentDidMount() {
    store.fetchData();
  }

  render() {
    return <BoardIndexView boards={store.boards} onAdd={store.addBoard} />;
  }
}

export default BoardIndex;
