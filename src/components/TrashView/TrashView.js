import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ItemGroup from "./ItemGroup";
import styled, { keyframes } from "styled-components";

const appear = keyframes`
0% {
  opacity: 0;
  transform: translateX(-30px);
}
100% {
  opacity: 1;
  transform: translateX(0);
}
`;

const Wrapper = styled.div`
  padding: 0.5em;
  will-change: transform, opacity;
  animation: ${appear} 1s ease;
  animation-delay: 200ms;
  animation-fill-mode: backwards;
`;

class TrashView extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { entries, restoreItem, deleteItem } = this.props.store;

    return (
      <Wrapper>
        {entries.map(([name, items]) => (
          <ItemGroup
            key={name}
            name={name}
            items={items}
            onDelete={deleteItem}
            onRestore={restoreItem}
          />
        ))}
      </Wrapper>
    );
  }
}

export default observer(TrashView);
