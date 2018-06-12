import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import MainHeader from "../MainHeader/MainHeader";
import style from "./BoardIndexView.scss";
import AddItem from "../AddItem/AddItem";

@observer
class BoardIndexView extends Component {
  static propTypes = {
    boards: PropTypes.object,
    onAdd: PropTypes.func
  };

  render() {
    const { boards, onAdd } = this.props;

    return (
      <Fragment>
        <MainHeader title="Board index" showHomeBtn={false} />
        <AddItem onSubmit={onAdd} hint="add board" />
        <div className={style.container}>
          <ul className={style.list}>
            {boards.map(board => (
              <li key={board.id}>
                <Link to={`/boards/${board.id}`}>{board.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default BoardIndexView;
