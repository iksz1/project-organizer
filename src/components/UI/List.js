import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";
import Card from "./Card";
import AddCard from "./AddCard";
import EditForm from "./EditForm";
import PopupButtons from "./PopupButtons";

export const Wrapper = styled.div`
  width: 30rem;
  margin: 0.5em;
  padding: 0.5em;
  background: ${props => props.theme.bgList};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 0.2em;
  word-wrap: break-word;
`;

export const ListHeader = styled.div`
  position: relative;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  text-align: ${props => (props.centered ? "center" : "inherit")};
  background: ${props => props.theme.bgHeader};
  color: ${props => props.theme.textAlt};
  font-weight: 500;
  border-radius: 0.2em;
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
    const popupItems = [
      { handler: this.toggleEditMode, icon: "edit" },
      { handler: () => onListDelete(list), icon: "trash" }
    ];

    return (
      <Wrapper>
        <ListHeader className={editMode ? "" : "draggable with-popup"}>
          {editMode ? (
            <EditForm
              text={list.name}
              onSubmit={this.handleUpdate}
              onCancel={this.toggleEditMode}
            />
          ) : (
            list.name
          )}
          <PopupButtons items={popupItems} />
        </ListHeader>
        <Container
          onDrop={this.onCardDrop}
          getChildPayload={this.movingCardPayload}
          dragClass="drag-class"
          groupName="cards"
          dragBeginDelay={5}
          dragHandleSelector=".draggable"
          nonDragAreaSelector=".non-draggable"
        >
          {list.cards.map(card => (
            <Draggable key={card.id} style={{ overflow: "inherit" }}>
              <Card key={card.id} card={card} onCardDelete={list.deleteCard} />
            </Draggable>
          ))}
        </Container>
        <AddCard onSubmit={list.addCard} />
      </Wrapper>
    );
  }
}

export default observer(List);
