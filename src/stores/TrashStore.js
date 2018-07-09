import { types, flow, destroy, getParent } from "mobx-state-tree";
import db from "../utils/dbWrapper";
import { BoardBase } from "./models/Board";
import { ListBase } from "./models/List";
import { CardBase } from "./models/Card";

const Items = types.model("Items", {
  boards: types.optional(types.array(BoardBase), []),
  lists: types.optional(types.array(ListBase), []),
  cards: types.optional(types.array(CardBase), [])
});

const TrashStore = types
  .model("TrashStore", {
    data: types.optional(Items, {})
  })
  .actions(self => ({
    deleteItem: flow(function* deleteItem(group, item) {
      yield db.remove(group, item);

      //remove related trashed items
      if (group === "lists") {
        self.data.cards = self.data.cards.filter(card => card.listId !== item.id);
      } else if (group === "boards") {
        self.data.cards = self.data.cards.filter(card => card.boardId !== item.id);
        self.data.lists = self.data.lists.filter(list => list.boardId !== item.id);
      }

      destroy(item);
    }),

    restoreItem: flow(function* restoreItem(group, item) {
      yield db.restore(group, item.id);
      destroy(item);
    }),

    fetchData: flow(function* fetchData() {
      try {
        self.data = yield db.getTrashed();
        getParent(self).changeTitle("Trash");
      } catch (error) {
        console.error(error); //eslint-disable-line
      }
    })
  }))
  .views(self => ({
    get entries() {
      return Object.keys(self.data).map(key => [key, self.data[key]]);
    }
  }));

export default TrashStore;
