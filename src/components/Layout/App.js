import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import BoardIndex from "../Pages/index/BoardIndex";
import Board from "../Pages/board/Board";
import Trash from "../Pages/trash/Trash";
import Settings from "../Pages/settings/Settings";
import Header from "./Header";
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

const App = ({ store }) => (
  <ThemeProvider theme={store.settingsStore.theme}>
    <Router>
      <Wrapper>
        <Header />
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

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(App));
