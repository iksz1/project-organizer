import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "react-icons/lib/md/arrow-back";
import TrashIcon from "react-icons/lib/md/delete";
import SettingsIcon from "react-icons/lib/md/settings";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: none;
  padding: 0.5em 1em;
  background: ${props => props.theme.bgHeader};
  color: ${props => props.theme.textLight};
  box-shadow: ${props => props.theme.boxShadow};
`;

const MainHeaderNav = styled.div`
  a {
    color: inherit;
    margin-left: 1em;
  }
`;
const MainHeaderTitle = styled.div``;

class MainHeader extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  static defaultProps = {
    showHomeBtn: true
  };

  render() {
    const { title } = this.props.store;

    return (
      <Wrapper>
        <MainHeaderTitle>
          <Link to="/" aria-label="Index">
            <BackIcon />
          </Link>&nbsp;
          {title}
        </MainHeaderTitle>
        <MainHeaderNav>
          <Link to="/trash" aria-label="Trash">
            <TrashIcon />
          </Link>
          <Link to="/settings" aria-label="Settings">
            <SettingsIcon />
          </Link>
        </MainHeaderNav>
      </Wrapper>
    );
  }
}

export default inject("store")(observer(MainHeader));
