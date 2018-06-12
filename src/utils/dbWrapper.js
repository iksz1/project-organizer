import Dexie from "dexie";

const db = new Dexie("dddb");
db.version(1).stores({
  boards: "++id, deleted",
  lists: "++id, boardId, deleted",
  cards: "++id, listId, boardId, deleted"
});

const get = (table, id) => {
  if (table && id) {
    return db[table].get(+id).then(item => item);
    // return db[table].where({ id: 1 }).first();
  }
};

const add = (table, item) => {
  // return update(table, { ...item, deleted: false });
  if (table && item) {
    return db[table].add({ ...item, deleted: false }).then(id => get(table, id));
  }
};

const update = (table, item) => {
  if (table && item) {
    return db[table].update(item.id, item);
  }
};

const bulkPut = (table, items) => {
  if (table && items) {
    return db[table].bulkPut(items);
  }
};

const remove = (table, id) => {
  if (table && id) {
    return get(table, id).then(item => {
      if (item.deleted) {
        // db[table].delete(id); //need to delete related data
        console.log(`item ${table}[${id}] deleted permanently (NO)`); //eslint-disable-line
      } else {
        update(table, { ...item, deleted: true });
      }
    });
  }
};

const getAllBoards = () => {
  // return db.boards.where({ deleted: false }).sortBy("order");
  return db.boards
    .orderBy(":id")
    .filter(board => !board.deleted)
    .sortBy("order");
};

const getListsByBoard = boardId => {
  return db.lists.where({ boardId, deleted: false }).sortBy("order");
};

// const getCardsByList = listId => {
//   return db.cards.where({ id: listId, deleted: false }).sortBy("order");
// };

const getCardsByBoard = boardId => {
  return db.cards.where({ boardId, deleted: false }).sortBy("order");
};

const getBoardRelated = id => {
  id = +id;
  return Promise.all([get("boards", id), getListsByBoard(id), getCardsByBoard(id)]).then(
    values => ({
      boards: values[0] ? [values[0]] : [],
      lists: values[1],
      cards: values[2]
    })
  );
};

export default { get, add, update, remove, bulkPut, getAllBoards, getBoardRelated };
