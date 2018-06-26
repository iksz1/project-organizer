import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ItemControls from "../ItemControls/ItemControls";
import { ListWrapper, ListHeader } from "../List/List";
import { CardWrapper } from "../Card/Card";

class ItemGroup extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.object,
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
          <CardWrapper key={item.id}>
            {item.name || item.text}
            <ItemControls
              onRestore={() => onRestore(item)}
              onDelete={() => onDelete(item)}
              btnSize="1.2em"
            />
          </CardWrapper>
        ))}
      </ListWrapper>
    );
  }
}

export default observer(ItemGroup);
