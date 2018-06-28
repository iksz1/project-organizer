import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import styled from "styled-components";
import { lighten } from "polished";
import EditForm from "../EditForm/EditForm";
import ItemControls from "../ItemControls/ItemControls";

export const CardWrapper = styled.div`
  padding: 0.5em 1em;
  margin: 0.2em 0;
  position: relative;
  background: ${props => lighten(0.05, props.theme.bgList)};
  border-radius: 0.2em;
  border: ${props => props.theme.border};
  &:hover .item-controls {
    display: block;
  }
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

    if (editMode) {
      return (
        <EditForm text={card.text} onSubmit={this.handleUpdate} onCancel={this.toggleEditMode} />
      );
    }

    return (
      <CardWrapper className="card-wrapper">
        {card.text}
        <ItemControls onEdit={this.toggleEditMode} onDelete={() => onCardDelete(card)} />
      </CardWrapper>
    );
  }
}

export default observer(Card);
