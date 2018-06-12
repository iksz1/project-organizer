import { types, flow, destroy } from "mobx-state-tree";
import { Card } from "./Card";
import db from "../utils/dbWrapper";
import calcOrder from "../utils/reorderHelper";

export const List = types
  .model("List", {
    id: types.number,
    boardId: types.number,
    name: types.string,
    cards: types.optional(types.array(Card), []),
    order: types.optional(types.number, 0),
    deleted: types.optional(types.boolean, false)
  })
  .actions(self => ({
    changeName: flow(function* changeName(name) {
      yield db.update("lists", { id: self.id, name });
      self.name = name;
    }),

    addCard: flow(function* addCard(text) {
      const card = yield db.add("cards", {
        text,
        listId: self.id,
        boardId: self.boardId,
        order: calcOrder({ toArr: self.cards })
      });
      self.cards.push(card);
    }),

    deleteCard: flow(function* deleteCard(item) {
      yield db.remove("cards", item.id);
      destroy(item);
    })
  }));
