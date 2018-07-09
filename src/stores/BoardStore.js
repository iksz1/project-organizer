import { types, flow, getParent } from "mobx-state-tree";
import Board from "./models/Board";
import db from "../utils/dbWrapper";

const BoardStore = types
  .model("BoardStore", {
    board: types.maybe(Board)
  })
  .actions(self => ({
    fetchData: flow(function* fetchData(boardId) {
      try {
        const data = yield db.getWithRelated("boards", boardId);
        if (data.boards[0]) {
          self.board = parseData(data);
          getParent(self).changeTitle(self.board.name);
        }
      } catch (error) {
        console.error(error); //eslint-disable-line
      }
    })
  }));

const parseData = data => {
  const lists = data.lists.map(list => ({
    ...list,
    cards: data.cards.filter(card => card.listId === list.id)
  }));
  return { ...data.boards[0], lists };
};

export default BoardStore;
