import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./AddCard.scss";

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
      <div className={style.addForm}>
        <form onSubmit={this.handleSubmit}>
          <textarea value={inputValue} onChange={this.handleTextChange} rows="2" />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
