import { Board } from "../../models/Board";

const boardData = {
  id: 1,
  name: "My new project"
};

it("creates instance successfully", () => {
  const board = Board.create(boardData);
  board.changeName("Project Kangaroo");
  expect(board.toJSON()).toMatchSnapshot();
});

it("can add list", () => {
  const board = Board.create(boardData);
  board.addList("ideas");
  expect(board.toJSON()).toMatchSnapshot();
});

it("can move card", () => {
  const card = { id: 1, listId: 1, boardId: 1, text: "free card" };
  const lists = [
    { id: 1, boardId: 1, name: "first", cards: [card] },
    { id: 2, boardId: 1, name: "second", cards: [] }
  ];
  const meta = { fromList: 1, fromIndex: 0, toList: 2, toIndex: 0 };
  const board = Board.create({ ...boardData, lists });

  board.moveCard(card, meta);
  expect(board.toJSON()).toMatchSnapshot();
});
