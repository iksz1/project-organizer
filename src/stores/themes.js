import { lighten } from "polished";

export default {
  default: {
    _name: "Green",
    bgMain: "#a7b496",
    bgHeader: "#8c907a",
    bgList: "#e1e4d3",
    bgExtra: "#abae9b",
    text: "#4c4c4c",
    textLight: lighten(0.05, "#e1e4d3"),
    border: "1px solid rgba(34, 36, 38, 0.15)",
    borderInput: "1px solid rgb(169, 169, 169)",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.15)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  },
  test: {
    _name: "test theme",
    bgMain: "#f5f5f5",
    bgHeader: "gray",
    bgList: "lightgray",
    bgExtra: "#9494b9",
    text: "#4c4c4c",
    textLight: "#fff",
    border: "1px solid rgba(34, 36, 38, 0.15)",
    borderInput: "1px solid rgb(169, 169, 169)",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.15)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  },
  celeste: {
    _name: "Celeste",
    bgMain: "#A7B8A2",
    bgHeader: "#8A9486",
    bgList: "#E5EBE2",
    bgExtra: "#ACB4A7",
    text: "#4c4c4c",
    textLight: "#E5EBE2",
    border: "1px solid rgba(34, 36, 38, 0.15)",
    borderInput: "1px solid rgb(169, 169, 169)",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.15)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  },
  bluewood: {
    _name: "Blue Wood",
    bgMain: "#9DC4C1",
    bgHeader: "#689D99",
    bgList: "#D0E5E3",
    bgExtra: "#8eadaa",
    text: "#4c4c4c",
    textLight: "#FFFFFE",
    border: "1px solid rgba(34, 36, 38, 0.15)",
    borderInput: "1px solid rgb(169, 169, 169)",
    boxShadow: "0px 1px 2px 0px rgba(34, 36, 38, 0.15)",
    boxShadowAlt: "0px 1px 5px 0px rgba(34, 36, 38, 0.15)"
  }
};
