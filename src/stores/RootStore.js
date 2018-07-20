import { types } from "mobx-state-tree";
import IndexStore from "./IndexStore";
import BoardStore from "./BoardStore";
import SettingsStore from "./SettingsStore";
import TrashStore from "./TrashStore";
import makeInspectable from "mobx-devtools-mst";

const RootStore = types
  .model("RootStore", {
    indexStore: types.maybe(IndexStore),
    boardStore: types.maybe(BoardStore),
    settingsStore: types.maybe(SettingsStore),
    trashStore: types.maybe(TrashStore),
    title: ""
  })
  .actions(self => ({
    changeTitle(title) {
      self.title = title;
    }
  }));

export default makeInspectable(
  RootStore.create({
    indexStore: IndexStore.create(),
    boardStore: BoardStore.create(),
    settingsStore: SettingsStore.create(),
    trashStore: TrashStore.create()
  })
);
