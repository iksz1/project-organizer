import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TrashIcon from "react-icons/lib/md/delete";
import SettingsIcon from "react-icons/lib/md/settings";
import IndexIcon from "react-icons/lib/md/home";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: none;
  font-size: 1.6rem;
  padding: 0.5em 1em;
  background: ${props => props.theme.bgHeader};
  color: ${props => props.theme.textAlt};
  box-shadow: ${props => props.theme.boxShadow};
  a {
    color: inherit;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 0.5em;
  }
`;

const Nav = styled.div`
  a {
    margin-left: 1em;
  }
`;

const Header = ({ store }) => (
  <Wrapper>
    <Title>
      <Link to="/" aria-label="Index">
        <IndexIcon size="1.2em" />
      </Link>
      {store.title}
    </Title>
    <Nav>
      <Link to="/trash" aria-label="Trash">
        <TrashIcon />
      </Link>
      <Link to="/settings" aria-label="Settings">
        <SettingsIcon />
      </Link>
    </Nav>
  </Wrapper>
);

Header.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(Header));
