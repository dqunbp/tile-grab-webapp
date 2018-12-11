import React, { useState, useCallback, useReducer } from "react";

import TaskList from "../TaskList";
import AddTask from "../AddTask";
import Map from "../Map";
import TaskFormModal from "../TaskFormModal";

import { backendUrl } from "../../constants";
import { withFetchedData } from "../../withData";
import { taskAppInitialState, taskAppReducer } from "../../reducer";

export const TasksContext = React.createContext(null);

export function App({ data = [] }) {
  const [state, dispatch] = useReducer(taskAppReducer, taskAppInitialState);
  const [isOpen, toggleModal] = useState(false);
  const toggleTaskForm = useCallback(() => toggleModal(!isOpen), [isOpen]);
  const closeModal = useCallback(() => toggleModal(false), []);
  return (
    <TasksContext.Provider
      value={{
        ...state,
        tasks: data,
        dispatch,
        toggleTaskForm
      }}
    >
      <div>
        <div className="container">
          <div className="sidebar">
            <TaskList />
            <AddTask openModal={toggleTaskForm} taskCount={3} />
          </div>
          <TaskFormModal isOpen={isOpen} closeModal={closeModal} />
          <Map />
        </div>
      </div>
    </TasksContext.Provider>
  );
}

export default withFetchedData(App, {
  url: `${backendUrl}/all`,
  interval: 2000
});
