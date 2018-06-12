import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./EditForm.scss";

export default class EditForm extends Component {
  static propTypes = {
    text: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
  };

  render() {
    return (
      <div className={`${style.editForm} dont-drag`}>
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.text} onChange={this.handleTextChange} rows="2" />
          <button type="submit">submit</button>&nbsp;
          <button onClick={this.props.onCancel}>cancel</button>
        </form>
      </div>
    );
  }
}
