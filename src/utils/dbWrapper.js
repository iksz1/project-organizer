import Dexie from "dexie";

const db = new Dexie("dddb");
db.version(1).stores({
  boards: "++id, deleted",
  lists: "++id, boardId, deleted",
  cards: "++id, listId, boardId, deleted"
});

/**
 * @param {string} table
 * @param {number} id
 */
const get = (table, id) => {
  if (table && id) {
    return db[table].get({ id, deleted: 0 }).then(item => item);
  }
};

/**
 * @param {string} table
 * @param {Object} item Object conta
 */
const add = (table, item) => {
  if (table && item) {
    return db[table].add({ ...item, deleted: 0 }).then(id => get(table, id));
  }
};

/**
 * @param {string} table
 * @param {Object} item
 */
const update = (table, item) => {
  if (table && item) {
    return db[table].update(item.id, item);
  }
};

/**
 * @param {string} table
 * @param {Object} item
 */
const remove = (table, item) => {
  if (table && item.id) {
    if (item.deleted === 0) {
      return moveToTrash(table, item.id);
    }
    return deleteWithRelated(table, item.id);
  }
};

/**
 * Move item to the trash.
 * @param {string} table
 * @param {number} id
 */
const moveToTrash = (table, id) => {
  switch (table) {
    case "cards":
      return db.cards.update(id, { deleted: 1 });
    case "lists":
      return db.lists.update(id, { deleted: 1 });
    case "boards":
      return db.boards.update(id, { deleted: 1 });
  }
};

/**
 * Permanently delete item and related data.
 * @param {string} table
 * @param {number} id
 */
const deleteWithRelated = (table, id) => {
  switch (table) {
    case "cards":
      return db.cards.delete(id);
    case "lists":
      return Promise.all([db.lists.delete(id), db.cards.where({ listId: id }).delete()]);
    case "boards":
      return Promise.all([
        db.boards.delete(id),
        db.lists.where({ boardId: id }).delete(),
        db.cards.where({ boardId: id }).delete()
      ]);
  }
};

/**
 * Restore trashed item.
 * @param {string} table
 * @param {number} id
 */
const restore = (table, id) => {
  switch (table) {
    case "cards":
      return db.cards.update(id, { deleted: 0 });
    case "lists":
      return db.lists.update(id, { deleted: 0 });
    case "boards":
      return db.boards.update(id, { deleted: 0 });
  }
};

/**
 * Get all items (excluding trashed) of the table.
 * @param {string} table
 */
const getAll = table => {
  return db[table].where({ deleted: 0 }).sortBy("order");
};

/**
 * Get item with related data.
 * @param {string} table
 * @param {number} id
 */
const getWithRelated = (table, id) => {
  id = +id;
  switch (table) {
    case "boards":
      return Promise.all([
        get(table, id),
        db.lists.where({ boardId: id, deleted: 0 }).sortBy("order"),
        db.cards.where({ boardId: id, deleted: 0 }).sortBy("order")
      ]).then(values => ({
        boards: values[0] ? [values[0]] : [],
        lists: values[1],
        cards: values[2]
      }));
    case "lists":
      return Promise.all([
        get(table, id),
        db.cards.where({ listId: id, deleted: 0 }).sortBy("order")
      ]).then(values => ({
        lists: values[0] ? [values[0]] : [],
        cards: values[1]
      }));
  }
};

/**
 * Get all trashed items. Related items are not included.
 */
const getTrashed = () => {
  return Promise.all([
    db.boards.where({ deleted: 1 }).toArray(),
    db.lists.where({ deleted: 1 }).toArray(),
    db.cards.where({ deleted: 1 }).toArray()
  ]).then(values => ({
    boards: values[0],
    lists: values[1],
    cards: values[2]
  }));
};

export default {
  get,
  add,
  update,
  remove,
  restore,
  getAll,
  getWithRelated,
  getTrashed
};
