import { types, flow } from "mobx-state-tree";
import { Board } from "../models/Board";
import db from "../utils/dbWrapper";
import makeInspectable from "mobx-devtools-mst";

const BoardIndexStore = types
  .model("BoardIndexStore", {
    boards: types.optional(types.array(Board), []),
    isLoading: false
  })
  .actions(self => ({
    addBoard: flow(function* addBoard(name) {
      const board = yield db.add("boards", { name, order: self.boards.length });
      self.boards.push(board);
    }),

    fetchData: flow(function* fetchData() {
      try {
        self.isLoading = true;
        const boards = yield db.getAllBoards();
        self.boards = boards;
      } catch (error) {
        console.error(error); //eslint-disable-line
      } finally {
        self.isLoading = false;
      }
    })
  }));

export default makeInspectable(BoardIndexStore.create());
