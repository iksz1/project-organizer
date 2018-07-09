import { types, flow } from "mobx-state-tree";
import db from "../../utils/dbWrapper";

export const CardBase = types.model("CardBase", {
  id: types.number,
  listId: types.number,
  boardId: types.number,
  text: types.string,
  order: types.optional(types.number, 0),
  labelId: types.optional(types.number, 0),
  deleted: types.optional(types.number, 0)
});

const Card = CardBase.named("Card").actions(self => ({
  changeText: flow(function* changeText(text) {
    yield db.update("cards", { id: self.id, text });
    self.text = text;
  })
}));

export default Card;
