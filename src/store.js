import { BoardStore } from "./stores/BoardStore";
import makeInspectable from "mobx-devtools-mst";
// import fakeData from "./stores/fakeData";

const store = BoardStore.create();

// const store = BoardStore.create({
//   board: parseData(fakeData)
// });

// addMiddleware(store, (call, next, abort) => {
//   const snap = getSnapshot(store);
//   if (call.name === "addCard") {
//     setTimeout(() => {
//       applySnapshot(store, snap);
//     }, 2000);
//   }
//   next(call, value => value);
// });

export default makeInspectable(store);
