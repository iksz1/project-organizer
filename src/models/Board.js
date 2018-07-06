import { types, flow, destroy, getParent } from "mobx-state-tree";
import { List } from "./List";
import db from "../utils/dbWrapper";
import calcOrder from "../utils/reorderHelper";

export const Board = types
  .model("Board", {
    id: types.number,
    name: types.string,
    lists: types.optional(types.array(List), []),
    order: types.optional(types.number, 0),
    deleted: types.optional(types.number, 0)
  })
  .actions(self => ({
    changeName: flow(function* changeName(name) {
      yield db.update("boards", { id: self.id, name });
      self.name = name;
    }),

    addList: flow(function* addList(name) {
      const list = yield db.add("lists", {
        boardId: self.id,
        name,
        order: calcOrder({ toArr: self.lists })
      });
      self.lists.push(list);
    }),

    deleteList: flow(function* deleteList(list) {
      yield db.remove("lists", list);
      destroy(list);
    }),

    moveList: flow(function* moveList(listToMove, meta) {
      const { fromIndex, toArr, toIndex } = meta;

      if (fromIndex === toIndex) return; //exit if position hasn't changed

      const order = calcOrder(meta);
      yield db.update("lists", { id: listToMove.id, order });
      listToMove.order = order;
      toArr.replace(toArr.slice().sort((a, b) => a.order - b.order));
    }),

    moveCard: flow(function* moveCard(cardToMove, meta) {
      const { fromArr, fromIndex, toArr, toIndex } = meta;

      if (fromArr === toArr && fromIndex === toIndex) return; //exit if position hasn't changed

      if (fromArr === toArr) {
        //same list scenario
        const order = calcOrder(meta);
        yield db.update("cards", { id: cardToMove.id, order });
        const cards = toArr.slice();
        cardToMove.order = order;
        cards.splice(toIndex, 0, cards.splice(fromIndex, 1)[0]);
        toArr.replace(cards);
      } else {
        //different lists scenario
        const order = calcOrder(meta);
        const card = { ...cardToMove, listId: getParent(toArr).id, order };
        yield db.update("cards", card);
        toArr.splice(toIndex, 0, card);
        fromArr.splice(fromIndex, 1);
      }
    })
  }));
