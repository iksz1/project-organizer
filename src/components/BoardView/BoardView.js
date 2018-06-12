import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import List from "../List/List";
import style from "./BoardView.scss";
import AddList from "../AddItem/AddItem";
import { observer } from "mobx-react";
import { Container, Draggable } from "react-smooth-dnd";
import MainHeader from "../MainHeader/MainHeader";

@observer
class BoardView extends Component {
  static propTypes = {
    board: PropTypes.object
  };

  onListDrop = ({ addedIndex, payload }) => {
    const { board } = this.props;
    //same as (index !== null && index !== undefined)
    if (addedIndex != null) {
      const { fromArr, fromIndex, list } = payload;
      board.moveList(list, { fromArr, fromIndex, toArr: fromArr, toIndex: addedIndex });
    }
  };

  movingListPayload = index => {
    const lists = this.props.board.lists;
    return { fromArr: lists, fromIndex: index, list: lists[index] };
  };

  render() {
    const board = this.props.board;

    return (
      <Fragment>
        <MainHeader title={board ? board.name : ""} />
        <div className={style.container}>
          <Container
            onDrop={this.onListDrop}
            getChildPayload={this.movingListPayload}
            dragClass={style.dragClass}
            groupName="lists"
            orientation="horizontal"
            dragBeginDelay={5}
            nonDragAreaSelector=".dont-drag"
            dragHandleSelector=".List_header_g2fL6"
          >
            {board.lists.map(list => (
              <Draggable key={list.id}>
                <List list={list} onCardMove={board.moveCard} onListDelete={board.deleteList} />
              </Draggable>
            ))}
          </Container>
          <AddList onSubmit={board.addList} hint="add list" />
        </div>
      </Fragment>
    );
  }
}

export default BoardView;
