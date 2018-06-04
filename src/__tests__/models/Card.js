import { Card } from "../../models/Card";

const cardData = {
  id: 1,
  listId: 1,
  boardId: 1,
  text: "decorators are stage-2"
};

it("creates instance successfully", () => {
  const card = Card.create(cardData);
  card.changeText("correct");
  expect(card.toJSON()).toMatchSnapshot();
});
