import React, { Component } from "react";
import PropTypes from "prop-types";

class AddList extends Component {
  static propTypes = {
    handleAction: PropTypes.func
  };

  state = {
    inputValue: ""
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.handleAction(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.onInputChange}
            placeholder="add list"
            required
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default AddList;
