import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./components/App/App";
import "./index.scss";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
