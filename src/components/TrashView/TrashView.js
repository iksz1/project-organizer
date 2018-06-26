import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ItemGroup from "./ItemGroup";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0.5em;
`;

class TrashView extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const store = this.props.store;
    const { itemGroups, restoreItem, deleteItem } = this.props.store;

    return (
      <Wrapper>
        {itemGroups.map(group => (
          <ItemGroup
            key={group}
            name={group}
            items={store[group]}
            onDelete={deleteItem}
            onRestore={restoreItem}
          />
        ))}
        {/* <Table name="boards" items={boards} onDelete={deleteItem} onRestore={restoreItem} />
        <Table name="lists" items={lists} onDelete={deleteItem} onRestore={restoreItem} />
        <Table name="cards" items={cards} onDelete={deleteItem} onRestore={restoreItem} /> */}
      </Wrapper>
    );
  }
}

export default observer(TrashView);
