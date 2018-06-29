import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Card from "../Card/Card";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";
import AddCard from "./AddCard";
import EditForm from "../EditForm/EditForm";
import ItemControls from "../ItemControls/ItemControls";

export const ListWrapper = styled.div`
  width: 300px;
  margin: 0.5em;
  padding: 0.5em;
  background: ${props => props.theme.bgList};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 0.2em;
`;

export const ListHeader = styled.div`
  position: relative;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  text-align: ${props => (props.centered ? "center" : "inherit")};
  background: ${props => props.theme.bgHeader};
  color: ${props => props.theme.textLight};
  border-radius: 0.2em;
  &:hover .item-controls {
    display: block;
  }
`;

class List extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    onListDelete: PropTypes.func,
    onCardMove: PropTypes.func
  };

  state = {
    editMode: false
  };

  toggleEditMode = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleUpdate = name => {
    this.props.list.changeName(name);
    this.toggleEditMode();
  };

  onCardDrop = ({ addedIndex, payload }) => {
    const { list, onCardMove } = this.props;
    //same as (index !== null && index !== undefined)
    if (addedIndex != null) {
      const { fromArr, fromIndex, card } = payload;
      onCardMove(card, { fromArr, fromIndex, toArr: list.cards, toIndex: addedIndex });
    }
  };

  movingCardPayload = index => {
    const cards = this.props.list.cards;
    return { fromArr: cards, fromIndex: index, card: cards[index] };
  };

  render() {
    const { list, onListDelete } = this.props;
    const editMode = this.state.editMode;

    return (
      <ListWrapper>
        {!editMode && (
          <ListHeader className="list-header">
            {list.name}
            <ItemControls onEdit={this.toggleEditMode} onDelete={() => onListDelete(list)} />
          </ListHeader>
        )}
        {editMode && (
          <ListHeader>
            <EditForm
              text={list.name}
              onSubmit={this.handleUpdate}
              onCancel={this.toggleEditMode}
            />
          </ListHeader>
        )}
        <Container
          onDrop={this.onCardDrop}
          getChildPayload={this.movingCardPayload}
          dragClass="drag-class"
          groupName="cards"
          dragBeginDelay={5}
          dragHandleSelector=".card-wrapper"
          nonDragAreaSelector=".item-controls"
        >
          {list.cards.map(card => (
            <Draggable key={card.id}>
              <Card key={card.id} card={card} onCardDelete={list.deleteCard} />
            </Draggable>
          ))}
        </Container>
        <AddCard onSubmit={list.addCard} />
      </ListWrapper>
    );
  }
}

export default observer(List);
