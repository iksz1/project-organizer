import { types } from "mobx-state-tree";
import IndexStore from "./IndexStore";
import BoardStore from "./BoardStore";
import SettingsStore from "./SettingsStore";
import TrashStore from "./TrashStore";
import makeInspectable from "mobx-devtools-mst";

const RootStore = types
  .model("RootStore", {
    index: types.maybe(IndexStore),
    board: types.maybe(BoardStore),
    settings: types.maybe(SettingsStore),
    trash: types.maybe(TrashStore),
    title: ""
  })
  .actions(self => ({
    changeTitle(title) {
      self.title = title;
    }
  }));

export default makeInspectable(
  RootStore.create({
    index: IndexStore.create(),
    board: BoardStore.create(),
    settings: SettingsStore.create(),
    trash: TrashStore.create()
  })
);
