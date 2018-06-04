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
  return update(table, { ...item, deleted: false });
  // .then(item =>
  //   update(table, { ...item, order: item.id * 100 })
  // );
};

const update = (table, item) => {
  if (table && item) {
    return db[table].put(item).then(id => get(table, id));
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
  return db.boards.where({ deleted: false }).toArray();
};

const getListsByBoard = boardId => {
  return db.lists.where({ boardId, deleted: false }).sortBy("order");
  // .toArray();
};

const getCardsByList = listId => {
  return db.cards.where({ id: listId, deleted: false }).sortBy("order");
  // .toArray();
};

const getCardsByBoard = boardId => {
  return db.cards.where({ boardId, deleted: false }).toArray();
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

export default { get, add, update, remove, getAllBoards, getBoardRelated };
