import { types } from "mobx-state-tree";
import themes from "./themes";

const SettingsStore = types
  .model("SettingsStore", {
    themeName: "default"
  })
  .actions(self => ({
    afterCreate() {
      try {
        const name = localStorage.getItem("_theme");
        if (name && /\w+/.test(name) && themes[name]) {
          self.themeName = name;
        }
      } catch (error) {
        console.error("Failed to load theme: ", error.message); //eslint-disable-line
      }
    },

    changeTheme(name) {
      self.themeName = name;
      try {
        localStorage.setItem("_theme", name);
      } catch (error) {
        console.error("Failed to save theme: ", error.message); //eslint-disable-line
      }
    }
  }))
  .views(self => ({
    get theme() {
      return themes[self.themeName];
    },

    get themeNames() {
      return Object.keys(themes);
    }
  }));

export default SettingsStore;
