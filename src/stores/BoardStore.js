import { types, flow } from "mobx-state-tree";
import { Board } from "../models/Board";
import db from "../utils/dbWrapper";

export const BoardStore = types
  .model("BoardStore", {
    board: types.maybe(Board),
    isLoading: false
  })
  .actions(self => ({
    // afterCreate() {
    //   self.fetchData(1);
    // },

    fetchData: flow(function* fetchData(boardId) {
      try {
        self.isLoading = true;
        const data = yield db.getBoardRelated(boardId);
        // applySnapshot(self, parseData(data));
        self.board = parseData(data);
      } catch (error) {
        console.error(error.message);
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
