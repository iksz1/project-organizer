import { types, flow } from "mobx-state-tree";
import db from "../utils/dbWrapper";

export const Card = types
  .model("Card", {
    id: types.number,
    listId: types.number,
    boardId: types.number,
    text: types.string,
    order: types.optional(types.number, 0),
    labelId: types.optional(types.number, 0),
    deleted: types.optional(types.boolean, false)
  })
  .actions(self => ({
    changeText: flow(function* changeText(text) {
      yield db.update("cards", { id: self.id, text });
      self.text = text;
    })
  }));
