export default {
  boards: [{ id: 1, name: "My project", order: 1, deleted: false }],
  lists: [
    { id: 1, boardId: 1, name: "ideas", order: 1, deleted: false },
    { id: 2, boardId: 1, name: "bugs", order: 2, deleted: false },
    { id: 3, boardId: 1, name: "notes", order: 3, deleted: false }
  ],
  cards: [
    { id: 1, listId: 1, boardId: 1, text: "implement soft deletes", order: 0, deleted: false },
    { id: 2, listId: 1, boardId: 1, text: "allow chosing theme", order: 1, deleted: false },
    { id: 3, listId: 1, boardId: 1, text: "db backup", order: 2, deleted: false },
    {
      id: 4,
      listId: 2,
      boardId: 1,
      text: "draggable item shows incorrectly",
      order: 3,
      deleted: false
    },
    {
      id: 5,
      listId: 2,
      boardId: 1,
      text: "double click not registering",
      order: 0,
      deleted: false
    },
    { id: 6, listId: 3, boardId: 1, text: "bundle fonts", order: 1, deleted: false },
    {
      id: 7,
      listId: 3,
      boardId: 1,
      text: "babel stage-2 preset options: legacy decorators: true, loose: true",
      order: 0,
      deleted: false
    }
  ]
};

//theme, labels
