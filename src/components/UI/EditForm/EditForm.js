import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten } from "polished";

const Wrapper = styled.div`
  text-align: left;
`;

export const Button = styled.button`
  padding: 1px 6px;
  line-height: 1.6rem;
  background: ${props => props.theme.bgExtra};
  color: ${props => props.theme.textLight};
  font-size: 1.3rem;
  border: none;
  border-radius: 2px;
  &:hover {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: vertical;
  overflow-x: hidden;
  color: ${props => props.theme.text};
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
