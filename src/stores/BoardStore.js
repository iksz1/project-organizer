import { types, flow } from "mobx-state-tree";
import { Board } from "../models/Board";
import db from "../utils/dbWrapper";
import makeInspectable from "mobx-devtools-mst";

const BoardStore = types
  .model("BoardStore", {
    board: types.maybe(Board),
    isLoading: false
  })
  .actions(self => ({
    fetchData: flow(function* fetchData(boardId) {
      try {
        self.isLoading = true;
        const data = yield db.getBoardRelated(boardId);
        if (data.boards[0]) {
          self.board = parseData(data);
        }
      } catch (error) {
        console.error(error); //eslint-disable-line
      } finally {
        self.isLoading = false;
      }
    })
  }));

const parseData = data => {
  const lists = data.lists.map(list => ({
    ...list,
    cards: data.cards.filter(card => card.listId === list.id)
  }));
  return { ...data.boards[0], lists };
  // return { board: { ...data.boards[0], lists } };
};

export default makeInspectable(BoardStore.create());
