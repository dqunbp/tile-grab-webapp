import React, { Component } from "react";

import "./App.css";
import "./Modal.css";

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { withFetchedData } from "./withData";
import { HOST } from "./constants";

import Modal from "react-modal";

import PropTypes from "prop-types";

const customStyles = {
  content: {
    width: "80%",
    height: "80vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  toggleOpenModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  render() {
    const { modalIsOpen } = this.state;
    const { data } = this.props;
    const modal = (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.toggleOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal__content">
          <TaskForm onSubmit={this.toggleOpenModal} />
        </div>
      </Modal>
    );
    return (
      <div className="app">
        <header>
          <h2 className="app__header">Tasks list</h2>
        </header>
        <div className="app__subheader">
          <div>Task count: {data ? data.length : 0}</div>
          <button className="btn" onClick={this.toggleOpenModal}>
            add task
          </button>
        </div>
        <div className="app__body">
          <TaskList data={this.props.data} />
        </div>
        {modal}
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array
};

export default withFetchedData(App, {
  url: `${HOST}/all`,
  interval: 20000
});
