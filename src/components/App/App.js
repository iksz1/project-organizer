import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BoardIndex from "../BoardIndex";
import Board from "../Board";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <header />
        <main>
          <Router>
            <Switch>
              <Route exact path="/boards/:boardId" component={Board} />
              <Route component={BoardIndex} />
            </Switch>
          </Router>
        </main>
        <footer />
      </Fragment>
    );
  }
}
