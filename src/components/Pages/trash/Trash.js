import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import TrashView from "./TrashView";

class Trash extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { trashStore } = this.props.store;
    trashStore.fetchData();
  }

  render() {
    const { trashStore } = this.props.store;

    return <TrashView store={trashStore} />;
  }
}

export default inject("store")(observer(Trash));
