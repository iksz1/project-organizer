import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, TextArea } from "../EditForm/EditForm";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextArea value={inputValue} onChange={this.handleTextChange} rows="2" />
          {inputValue && <Button type="submit">submit</Button>}
        </form>
      </div>
    );
  }
}
