import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/Layout/App";
import store from "./stores/RootStore";
import { injectGlobal } from "styled-components";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

//global styles
injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: "Roboto", Arial, sans-serif;
    font-size: 1.5rem;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  input,
  textarea,
  select {
    color: inherit;
  }
  button,
  input {
    font-family: inherit;
  }
  .drag-class {
    opacity: 0.5;
  }
  .with-popup:hover .popup {
    display: block;
  }
`;

// if (module.hot) {
//   module.hot.accept();
// }
