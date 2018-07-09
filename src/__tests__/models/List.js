import db from "../../utils/dbWrapper";
import List from "../../stores/models/List";

jest.mock("../../utils/dbWrapper");

const listData = {
  id: 1,
  boardId: 1,
  name: "ideas"
};

it("creates instance successfully", async () => {
  const list = List.create(listData);
  db.update.mockResolvedValue();
  await list.changeName("features");
  expect(list.toJSON()).toMatchSnapshot();
});

it("can add a card", async () => {
  const list = List.create(listData);
  db.add = jest.fn((table, card) => Promise.resolve({ ...card, id: 1 }));
  await list.addCard("add theming");
  expect(list.toJSON()).toMatchSnapshot();
});
