import { types, flow, destroy, getParent } from "mobx-state-tree";
import { Board } from "../models/Board";
import db from "../utils/dbWrapper";

const IndexStore = types
  .model("BoardIndexStore", {
    boards: types.optional(types.array(Board), []),
    isLoading: false
  })
  .actions(self => ({
    addBoard: flow(function* addBoard(name) {
      const board = yield db.add("boards", { name, order: self.boards.length });
      self.boards.push(board);
    }),

    deleteBoard: flow(function* deleteBoard(board) {
      yield db.remove("boards", board);
      destroy(board);
    }),

    fetchData: flow(function* fetchData() {
      try {
        self.isLoading = true;
        self.boards = yield db.getAll("boards");
        getParent(self).changeTitle("Board index");
      } catch (error) {
        console.error(error); //eslint-disable-line
      } finally {
        self.isLoading = false;
      }
    })
  }));

export default IndexStore;
