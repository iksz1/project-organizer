import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import styled from "styled-components";
import EditForm from "../EditForm/EditForm";
import PopupButtons from "../PopupButtons/PopupButtons";

export const Wrapper = styled.div`
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  position: relative;
  background: ${props => props.theme.bgCard};
  border-radius: 0.2em;
  box-shadow: ${props => props.theme.boxShadowAlt};
  word-wrap: break-word;
`;

class Card extends Component {
  static propTypes = {
    card: PropTypes.object,
    onCardDelete: PropTypes.func
  };

  state = {
    editMode: false
  };

  toggleEditMode = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleUpdate = text => {
    this.props.card.changeText(text);
    this.toggleEditMode();
  };

  render() {
    const { card, onCardDelete } = this.props;
    const editMode = this.state.editMode;
    const popupItems = [
      { handler: this.toggleEditMode, icon: "edit" },
      { handler: () => onCardDelete(card), icon: "trash" }
    ];

    if (editMode) {
      return (
        <Wrapper>
          <EditForm text={card.text} onSubmit={this.handleUpdate} onCancel={this.toggleEditMode} />
        </Wrapper>
      );
    }

    return (
      <Wrapper className="draggable with-popup">
        {card.text}
        <PopupButtons items={popupItems} />
      </Wrapper>
    );
  }
}

export default observer(Card);
