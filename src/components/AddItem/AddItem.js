import React, { Component } from "react";
import PropTypes from "prop-types";
import { lighten } from "polished";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1em;
`;

const AddItemForm = styled.form`
  & input {
    padding: 0.5em;
    background: ${props => lighten(0.1, props.theme.bgList)};
    border: ${props => props.theme.borderInput};
    border-radius: 0.2em;
  }
  & button {
    padding: 0.5em;
    background-color: ${props => props.theme.bgHeader};
    border: 1px solid ${props => props.theme.bgHeader};
    color: ${props => props.theme.textLight};
    border-radius: 0.2em;
  }
`;

export default class AddItem extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    hint: PropTypes.string
  };

  static defaultProps = {
    hint: ""
  };

  state = {
    value: ""
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    const value = this.state.value;

    return (
      <Wrapper>
        <AddItemForm onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder={this.props.hint}
          />
          <button type="submit" disabled={value ? false : true}>
            Add
          </button>
        </AddItemForm>
      </Wrapper>
    );
  }
}
