import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import BoardIndex from "../BoardIndex";
import Board from "../Board";
import Trash from "../Trash";
import Settings from "../Settings";
import MainHeader from "../MainHeader/MainHeader";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

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
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  main {
    display: flex;
    flex-flow: column;
    flex: auto;
  }
  input,
  textarea,
  select {
    color: inherit;
  }
  .drag-class {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div`
  background: ${props => props.theme.bgMain};
  color: ${props => props.theme.text};
  min-height: 100vh;
  display: flex;
  flex-flow: column;
`;

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { theme } = this.props.store.settings;

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Wrapper>
            <MainHeader />
            <main>
              <Switch>
                <Route exact path="/boards/:boardId" component={Board} />
                <Route exact path="/trash" component={Trash} />
                <Route exact path="/settings" component={Settings} />
                <Route component={BoardIndex} />
              </Switch>
            </main>
          </Wrapper>
        </Router>
      </ThemeProvider>
    );
  }
}

export default inject("store")(observer(App));
