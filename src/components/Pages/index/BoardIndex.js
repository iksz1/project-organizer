import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import IndexView from "./BoardIndexView";

class BoardIndex extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const indexStore = this.props.store.index;
    indexStore.fetchData();
  }

  render() {
    const indexStore = this.props.store.index;

    return <IndexView store={indexStore} />;
  }
}

export default inject("store")(observer(BoardIndex));
