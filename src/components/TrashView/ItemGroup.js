import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import PopupButtons from "../UI/PopupButtons/PopupButtons";
import { Wrapper, ListHeader } from "../UI/List/List";
import { Wrapper as CardWrapper } from "../UI/Card/Card";

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
      <Wrapper>
        <ListHeader centered>{name.toUpperCase()}</ListHeader>
        {items.map(item => (
          <ItemWrapper key={item.id} className="with-popup">
            {item.name || item.text}
            <PopupButtons
              items={[
                { handler: () => onRestore(item), icon: "restore" },
                { handler: () => onDelete(item), icon: "remove" }
              ]}
              btnSize="1.2em"
            />
          </ItemWrapper>
        ))}
      </Wrapper>
    );
  }
}

export default observer(ItemGroup);
