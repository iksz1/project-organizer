import { types, flow, destroy, onPatch } from "mobx-state-tree";
import { Card } from "./Card";
import db from "../utils/dbWrapper";

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
    afterCreate() {
      onPatch(self, snap => console.log(snap));
    },

    changeName: flow(function* changeName(name) {
      const list = yield db.update("lists", { ...self.toJSON(), name, cards: [] });
      self.name = list.name;
    }),

    addCard: flow(function* addCard(text) {
      const card = yield db.add("cards", {
        text,
        listId: self.id,
        boardId: self.boardId,
        order: self.cards.length
      });
      self.cards.push(card);
    }),

    // updateCard: flow(function* updateCard(id, payload) {
    //   const index = self.cards.findIndex(item => item.id === id);
    //   const card = self.cards[index];
    //   self.cards[index] = { ...self.cards[index], ...payload };
    // }),

    deleteCard: flow(function* deleteCard(item) {
      // const index = self.cards.findIndex(item => item.id === id);
      // self.cards.splice(index, 1);
      yield db.remove("cards", item.id);
      destroy(item);
    })
  }));
