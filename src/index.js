import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App/App";
import store from "./stores/RootStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

// if (module.hot) {
//   module.hot.accept();
// }
