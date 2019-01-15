import React, { useReducer } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimesCircle,
  faPlus,
  faCheckCircle,
  faEraser
} from "@fortawesome/free-solid-svg-icons";

import TaskList from "../TaskList";
import AddTask from "../AddTask";
import Map from "../Map";

import { backendUrl } from "../../constants";
import { withFetchedData } from "../../withData";
import { taskAppInitialState, taskAppReducer } from "../../reducer";

library.add(faTimesCircle, faCheckCircle, faPlus, faEraser);

export const TasksContext = React.createContext(null);

export function App({ data = [] }) {
  const [state, dispatch] = useReducer(taskAppReducer, taskAppInitialState);
  return (
    <TasksContext.Provider
      value={{
        ...state,
        tasks: data,
        dispatch
      }}
    >
      <div>
        <div className="container">
          <div className="sidebar">
            <TaskList />
            <AddTask />
          </div>
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
