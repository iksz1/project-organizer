import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import EditIcon from "react-icons/lib/md/mode-edit";
import TrashIcon from "react-icons/lib/md/delete";
import RestoreIcon from "react-icons/lib/md/replay";
import RemoveIcon from "react-icons/lib/go/x";

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

const Icon = ({ name, size }) => {
  const icons = { edit: EditIcon, trash: TrashIcon, restore: RestoreIcon, remove: RemoveIcon };
  const El = icons[name];
  return <El size={size} />;
};

export default class PopupButtons extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    btnSize: PropTypes.string
  };

  static defaultProps = {
    btnSize: "1em"
  };

  render() {
    const { items, btnSize } = this.props;

    return (
      <Wrapper className="popup non-draggable">
        {items.map(({ handler, icon }) => (
          <Button key={icon} onClick={handler} aria-label={icon}>
            <Icon name={icon} size={btnSize} />
          </Button>
        ))}
      </Wrapper>
    );
  }
}
