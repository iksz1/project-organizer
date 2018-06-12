import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "./MainHeader.scss";
import BackIcon from "react-icons/lib/md/arrow-back";
import TrashIcon from "react-icons/lib/md/delete";
import SettingsIcon from "react-icons/lib/md/settings";

export default class MainHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    showHomeBtn: PropTypes.bool
  };

  static defaultProps = {
    showHomeBtn: true
  };

  render() {
    const { title, showHomeBtn } = this.props;

    return (
      <div className={style.container}>
        <div>
          {showHomeBtn && (
            <Link to="/">
              <BackIcon />
            </Link>
          )}&nbsp;
          {title}
        </div>
        <div className={style.nav}>
          <button>
            <TrashIcon size="1.2em" />
          </button>
          <button>
            <SettingsIcon size="1.2em" />
          </button>
        </div>
      </div>
    );
  }
}
