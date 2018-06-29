import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import EditIcon from "react-icons/lib/md/mode-edit";
import DeleteIcon from "react-icons/lib/md/delete";
import RestoreIcon from "react-icons/lib/md/replay";
// import RemoveIcon from "react-icons/lib/md/highlight-remove";
// import RemoveIcon from "react-icons/lib/go/x";

const Wrapper = styled.div`
  display: none;
  position: absolute;
  top: 2px;
  right: 2px;
`;

const Button = styled.button`
  padding: 1px 4px;
  background: none;
  border: none;
  color: inherit;
  margin-left: 0.2em;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export default class ItemControls extends Component {
  static propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func,
    btnSize: PropTypes.string
  };

  static defaultProps = {
    btnSize: "1em"
  };

  render() {
    const { onEdit, onDelete, onRestore, btnSize } = this.props;

    return (
      <Wrapper className="item-controls">
        {onEdit && (
          <Button onClick={onEdit}>
            <EditIcon size={btnSize} />
          </Button>
        )}
        {onRestore && (
          <Button onClick={onRestore}>
            <RestoreIcon size={btnSize} />
          </Button>
        )}
        <Button onClick={onDelete}>
          <DeleteIcon size={btnSize} />
        </Button>
      </Wrapper>
    );
  }
}
