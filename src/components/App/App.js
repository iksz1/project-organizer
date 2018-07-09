import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import BoardIndex from "../BoardIndex";
import Board from "../Board";
import Trash from "../Trash";
import Settings from "../Settings";
import MainHeader from "../MainHeader/MainHeader";
import styled, { ThemeProvider } from "styled-components";

const Wrapper = styled.div`
  background: ${props => props.theme.bgMain};
  color: ${props => props.theme.text};
  min-height: 100vh;
  display: flex;
  flex-flow: column;
`;

const MainContent = styled.main`
  display: flex;
  flex-flow: column;
  flex: auto;
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
            <MainContent>
              <Switch>
                <Route exact path="/boards/:boardId" component={Board} />
                <Route exact path="/trash" component={Trash} />
                <Route exact path="/settings" component={Settings} />
                <Route component={BoardIndex} />
              </Switch>
            </MainContent>
          </Wrapper>
        </Router>
      </ThemeProvider>
    );
  }
}

export default inject("store")(observer(App));
