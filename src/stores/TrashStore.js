import { types, flow, destroy, applySnapshot, getParent } from "mobx-state-tree";
import db from "../utils/dbWrapper";
import { Board } from "../models/Board";
import { List } from "../models/List";
import { Card } from "../models/Card";

const TrashStore = types
  .model("TrashStore", {
    boards: types.optional(types.array(Board), []),
    lists: types.optional(types.array(List), []),
    cards: types.optional(types.array(Card), []),
    isLoading: false
  })
  .actions(self => ({
    deleteItem: flow(function* deleteItem(item) {
      if (item.listId != null) {
        yield db.remove("cards", item);
      } else if (item.boardId != null) {
        yield db.remove("lists", item);
        self.cards = self.cards.filter(card => card.listId !== item.id);
      } else {
        yield db.remove("boards", item);
        self.cards = self.cards.filter(card => card.boardId !== item.id);
        self.lists = self.lists.filter(list => list.boardId !== item.id);
      }
      destroy(item);
    }),

    restoreItem: flow(function* restoreItem(item) {
      if (item.listId != null) {
        yield db.restore("cards", item.id);
      } else if (item.boardId != null) {
        yield db.restore("lists", item.id);
      } else {
        yield db.restore("boards", item.id);
      }
      destroy(item);
    }),

    fetchData: flow(function* fetchData() {
      try {
        self.isLoading = true;
        const data = yield db.getTrashed();
        applySnapshot(self, data);
        getParent(self).changeTitle("Trash");
      } catch (error) {
        console.error(error); //eslint-disable-line
      } finally {
        self.isLoading = false;
      }
    })
  }))
  .views(self => ({
    get itemGroups() {
      return ["boards", "lists", "cards"];
    }
  }));

export default TrashStore;
