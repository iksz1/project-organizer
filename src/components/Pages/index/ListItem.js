import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darken } from "polished";
import EditForm from "../../UI/EditForm";
import PopupButtons from "../../UI/PopupButtons";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 1em 0;
  padding: 1em;
  background: ${props => props.theme.bgCard};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 0.2em;
  text-align: center;
  word-wrap: break-word;
  &:hover {
    background: ${props => darken(0.05, props.theme.bgCard)};
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

class ListItem extends Component {
  static propTypes = {
    board: PropTypes.object,
    onDelete: PropTypes.func
  };

  state = {
    editMode: false
  };

  toggleEditMode = e => {
    e.preventDefault();
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleUpdate = name => {
    this.props.board.changeName(name);
    this.setState({ editMode: false });
  };

  handleDelete = e => {
    e.preventDefault();
    const { board, onDelete } = this.props;
    onDelete(board);
  };

  render() {
    const { id, name } = this.props.board;
    const editMode = this.state.editMode;
    const popupItems = [
      { handler: this.toggleEditMode, icon: "edit" },
      { handler: this.handleDelete, icon: "trash" }
    ];

    if (editMode) {
      return (
        <Wrapper>
          <EditForm text={name} onSubmit={this.handleUpdate} onCancel={this.toggleEditMode} />
        </Wrapper>
      );
    }

    return (
      <StyledLink to={`/boards/${id}`}>
        <Wrapper className="with-popup">
          {name}
          <PopupButtons items={popupItems} />
        </Wrapper>
      </StyledLink>
    );
  }
}

export default observer(ListItem);
