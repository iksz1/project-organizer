import { types, flow, destroy } from "mobx-state-tree";
import { List } from "./List";
import db from "../utils/dbWrapper";

export const Board = types
  .model("Board", {
    id: types.number,
    name: types.string,
    lists: types.optional(types.array(List), []),
    order: types.optional(types.number, 0),
    deleted: types.optional(types.boolean, false)
  })
  .actions(self => ({
    changeName: flow(function* changeName(name) {
      const board = yield db.update("boards", { ...self.toJSON(), name, lists: [] });
      self.name = board.name;
    }),

    addList: flow(function* addList(name) {
      const list = yield db.add("lists", { boardId: self.id, name, order: self.lists.length });
      self.lists.push(list);
    }),

    deleteList: flow(function* deleteList(item) {
      yield db.remove("lists", item.id);
      destroy(item);
    }),

    moveCard(card, meta) {
      const { fromList, fromIndex, toList, toIndex } = meta;
      if (fromList === toList && fromIndex === toIndex) return; //exit if position hasn't changed

      if (fromList === toList) {
        const list = self.lists.find(item => item.id === fromList);
        const cards = list.cards.slice();
        cards.splice(toIndex, 0, cards.splice(fromIndex, 1)[0]);

        const tmp = cards.slice(fromIndex);
        tmp.forEach((t, i) => (t.order = i + fromIndex));
        cards.splice(fromIndex, tmp.length, ...tmp);

        list.cards = cards;
      } else {
        self.lists[findIndex(self.lists, toList)].cards.splice(toIndex, 0, {
          ...card,
          listId: toList
        });
        self.lists[findIndex(self.lists, fromList)].cards.splice(fromIndex, 1);
      }
    }
  }));

const findIndex = (arr, id) => arr.findIndex(item => item.id === id);
