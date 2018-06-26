import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ListWrapper, ListHeader } from "../List/List";
import { CardWrapper } from "../Card/Card";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5em;
`;

const ListItem = CardWrapper.extend`
  padding: 1em;
  select {
    width: 100%;
    padding: 0.5em;
  }
`;

class SettingsView extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  state = {
    themeName: this.props.store.themeName
  };

  handleThemeChange = ({ target }) => {
    this.setState({ themeName: target.value });
    this.props.store.changeTheme(target.value);
  };

  render() {
    const { themeName } = this.state;
    const { themeNames } = this.props.store;

    return (
      <Wrapper>
        <ListWrapper>
          <ListHeader>Theme</ListHeader>
          <ListItem>
            <select value={themeName} onChange={this.handleThemeChange}>
              {themeNames.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </ListItem>
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default SettingsView;
