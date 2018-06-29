import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ItemControls from "../UI/ItemControls/ItemControls";
import { ListWrapper, ListHeader } from "../UI/List/List";
import { CardWrapper } from "../UI/Card/Card";

const ItemWrapper = CardWrapper.extend`
  &:last-child {
    margin-bottom: 0;
  }
`;

class ItemGroup extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func
  };

  render() {
    const { name, items, onDelete, onRestore } = this.props;

    if (items.length === 0) return null;

    return (
      <ListWrapper>
        <ListHeader centered>{name.toUpperCase()}</ListHeader>
        {items.map(item => (
          <ItemWrapper key={item.id}>
            {item.name || item.text}
            <ItemControls
              onRestore={() => onRestore(item)}
              onDelete={() => onDelete(item)}
              btnSize="1.2em"
            />
          </ItemWrapper>
        ))}
      </ListWrapper>
    );
  }
}

export default observer(ItemGroup);
