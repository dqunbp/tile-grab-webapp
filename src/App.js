import React, { Component } from 'react'

import './App.css'
import './Modal.css'

import TaskList from './TaskList'
import Modal from './Modal'
import TaskForm from './TaskForm'

import { withFetchedData } from './withData'
class App extends Component {

  render() {
    const { data } = this.props
    const modal = (
      <Modal>
        <div className="modal">
          <div className="modal__content">
            <TaskForm/>
          </div>
        </div>
      </Modal>
    )
    return (
      <div className="App">
        <h2 className="App__header">Tasks list</h2>
        <div className="App__subheader">
          <div>Task count: {data ? data.length : 0}</div>
          <button className="btn">add task</button>
        </div>
        <TaskList data={this.props.data} />
        {modal}
      </div>
    )
  }
}
export default withFetchedData(App, { url: 'http://localhost:4444/tasks', interval: 40000 })
