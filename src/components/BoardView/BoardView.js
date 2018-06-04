import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import List from "../List/List";
import style from "./BoardView.scss";
import AddList from "../AddList";
import { observer } from "mobx-react";

@observer
class BoardView extends Component {
  static propTypes = {
    board: PropTypes.object
  };

  render() {
    const board = this.props.board;

    return (
      <Fragment>
        <div className={style.header}>
          <div>{board && board.name}</div>
          <div>
            <button>Trash</button>
            <button>Settings</button>
          </div>
        </div>
        <div className={style.container}>
          {board.lists.map(list => (
            <List
              key={list.id}
              list={list}
              onCardMove={board.moveCard}
              onListDelete={board.deleteList}
            />
          ))}
          <AddList handleAction={board.addList} />
        </div>
      </Fragment>
    );
  }
}

export default BoardView;
