import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./AddItem.scss";

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
    return (
      <div className={style.addItem}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.props.hint}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
