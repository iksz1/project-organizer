import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten, darken } from "polished";

const Wrapper = styled.div`
  margin-top: 0.2em;
`;

export const Button = styled.button`
  background: ${props => props.theme.bgExtra};
  border: 1px solid ${props => props.theme.bgExtra};
  color: ${props => lighten(0.1, props.theme.bgList)};
  border-radius: 2px;
  &:hover {
    background: ${props => darken(0.05, props.theme.bgExtra)};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: vertical;
  background: ${props => lighten(0.1, props.theme.bgList)};
  border: ${props => props.theme.borderInput};
  border-radius: 0.2em;
`;

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
    const text = this.state.text;

    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <TextArea value={text} onChange={this.handleTextChange} rows="2" />
          <Button type="submit" disabled={text ? false : true}>
            submit
          </Button>&nbsp;
          <Button onClick={this.props.onCancel}>cancel</Button>
        </form>
      </Wrapper>
    );
  }
}
