import db from "../../utils/dbWrapper";
import { Card } from "../../models/Card";

jest.mock("../../utils/dbWrapper");

const cardData = {
  id: 1,
  listId: 1,
  boardId: 1,
  text: "decorators are stage-2"
};

it("creates instance successfully", async () => {
  const card = Card.create(cardData);
  db.update.mockResolvedValue();
  await card.changeText("correct");
  expect(card.toJSON()).toMatchSnapshot();
});
