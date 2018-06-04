import { List } from "../../models/List";

const listData = {
  id: 1,
  boardId: 1,
  name: "ideas"
};

it("creates instance successfully", () => {
  const list = List.create(listData);
  list.changeName("features");
  expect(list.toJSON()).toMatchSnapshot();
});

it("can add a card", () => {
  const list = List.create(listData);
  list.addCard("add theming");
  expect(list.toJSON()).toMatchSnapshot();
});
