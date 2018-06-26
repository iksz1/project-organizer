import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, TextArea } from "../EditForm/EditForm";

const Wrapper = styled.div`
  margin-top: 0.2em;
`;

export default class AddCard extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  state = {
    inputValue: ""
  };

  handleTextChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <TextArea value={inputValue} onChange={this.handleTextChange} rows="2" />
          <Button type="submit" disabled={inputValue ? false : true}>
            submit
          </Button>
          {/* <textarea value={inputValue} onChange={this.handleTextChange} rows="2" />
          <button type="submit" disabled={inputValue ? false : true}>
            submit
          </button> */}
        </form>
      </Wrapper>
    );
  }
}