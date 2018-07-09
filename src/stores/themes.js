import { lighten } from "polished";

export default {
  default: {
    _name: "Sunny",
    bgMain: "#A2B5C8",
    bgHeader: "#FFF1DC",
    bgList: "#FFF1DC",
    bgCard: lighten(0.05, "#FFF1DC"),
    bgInput: lighten(0.1, "#FFF1DC"),
    bgExtra: "inherit",
    text: "#5f5f5f",
    textAlt: "#907a61",
    border: "1px solid rgba(255, 225, 181, 0.68)",
    borderInput: "1px solid rgb(255, 225, 181)",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.15)",
    boxShadowAlt: "1px 1px 0px 0px rgba(34, 36, 38, 0.15)"
  },
  celeste: {
    _name: "Celeste",
    bgMain: "#A7B8A2",
    bgHeader: "#8A9486",
    bgList: "#E5EBE2",
    bgCard: lighten(0.05, "#E5EBE2"),
    bgInput: lighten(0.1, "#E5EBE2"),
    bgExtra: "#ACB4A7",
    text: "#4c4c4c",
    textAlt: "#fff",
    border: "1px solid rgba(34, 36, 38, 0.15)",
    borderInput: "1px solid rgb(169, 169, 169)",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.15)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  },
  gray: {
    _name: "Gray",
    bgMain: "#fbfbfb",
    bgHeader: "#e8e8e8",
    bgList: "#e8e8e8",
    bgCard: lighten(0.05, "#e8e8e8"),
    bgInput: lighten(0.1, "#e8e8e8"),
    bgExtra: "inherit",
    text: "#4c4c4c",
    textAlt: "#4c4c4c",
    border: "1px solid rgba(34, 36, 38, 0.15)",
    borderInput: "1px solid rgba(34, 36, 38, 0.15)",
    boxShadow: "0px 0px 4px 0px rgba(34, 36, 38, 0.25)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  },
  isabelline: {
    _name: "Isabelline",
    bgMain: "#rgba(241, 237, 238, 0.6)",
    bgHeader: "#9ea5c1",
    bgList: "#F1EDEE",
    bgCard: lighten(0.05, "#F1EDEE"),
    bgInput: lighten(0.1, "#F1EDEE"),
    bgExtra: "#d2b5bc",
    text: "#4c4c4c",
    textAlt: "#fff",
    border: "none",
    borderInput: "1px solid #d4d4d4",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.25)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  }
};
