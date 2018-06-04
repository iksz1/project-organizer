import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BoardIndexView extends Component {
  static propTypes = {
    boards: PropTypes.object
  };

  state = {
    inputValue: ""
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { inputValue } = this.state;
    const { handleCreate } = this.props;

    return (
      <div>
        <p>board index</p>
        <input
          type="text"
          value={inputValue}
          onChange={this.onInputChange}
          placeholder="board name"
        />
        <button onClick={() => handleCreate(inputValue)}>submit</button>
      </div>
    );
  }
}
