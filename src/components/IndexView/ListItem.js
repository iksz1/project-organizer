import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { lighten } from "polished";
import styled from "styled-components";
import EditForm from "../UI/EditForm/EditForm";
import ItemControls from "../UI/ItemControls/ItemControls";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 1em 0;
  padding: 1em;
  background: ${props => lighten(0.05, props.theme.bgList)};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 0.2em;
  text-align: center;
  &:hover {
    background: ${props => props.theme.bgList};
    .item-controls {
      display: block;
    }
  }
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
    const { name } = this.props.board;
    const editMode = this.state.editMode;

    if (editMode) {
      return (
        <Wrapper>
          <EditForm text={name} onSubmit={this.handleUpdate} onCancel={this.toggleEditMode} />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        {name}
        <ItemControls onEdit={this.toggleEditMode} onDelete={this.handleDelete} />
      </Wrapper>
    );
  }
}

export default observer(ListItem);
