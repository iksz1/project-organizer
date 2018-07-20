import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import SettingsView from "./SettingsView";

class Settings extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.store.changeTitle("Settings");
  }

  render() {
    const { settingsStore } = this.props.store;

    return <SettingsView store={settingsStore} />;
  }
}

export default inject("store")(Settings);
