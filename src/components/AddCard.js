import React, { Component } from "react";
import PropTypes from "prop-types";

class AddCard extends Component {
  static propTypes = {
    handleAction: PropTypes.func
  };

  state = {
    inputValue: ""
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit = () => {
    this.props.handleAction(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <textarea name="text" rows="2" value={inputValue} onChange={this.onInputChange} required />
        <button onClick={this.onSubmit}>submit</button>
      </div>
    );
  }
}

export default AddCard;
