import db from "../../utils/dbWrapper";
import { Board } from "../../models/Board";

jest.mock("../../utils/dbWrapper");

const boardData = {
  id: 1,
  name: "My new project"
};

it("creates instance successfully", async () => {
  const board = Board.create(boardData);
  db.update.mockResolvedValue();
  await board.changeName("Project Kangaroo");
  expect(board.toJSON()).toMatchSnapshot();
});

it("can add list", async () => {
  const board = Board.create(boardData);
  db.add = jest.fn((table, list) => Promise.resolve({ ...list, id: 1 }));
  await board.addList("ideas");
  expect(board.toJSON()).toMatchSnapshot();
});

it("can move card", async () => {
  const card = { id: 1, listId: 1, boardId: 1, text: "free card" };
  const lists = [
    { id: 1, boardId: 1, name: "first", cards: [card] },
    { id: 2, boardId: 1, name: "second", cards: [] }
  ];
  const board = Board.create({ ...boardData, lists });
  const meta = {
    fromArr: board.lists[0].cards,
    fromIndex: 0,
    toArr: board.lists[1].cards,
    toIndex: 0
  };

  db.update.mockResolvedValue();
  await board.moveCard(board.lists[0].cards[0], meta);
  expect(board.toJSON()).toMatchSnapshot();
});
