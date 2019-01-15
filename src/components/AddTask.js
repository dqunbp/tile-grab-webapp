import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";

import { TasksContext } from "./App";

export function AddTask() {
  const { tasks } = useContext(TasksContext);
  return useMemo(
    () => (
      <div className="add-task">
        <div className="add-task__total">Total: {tasks.length}</div>
      </div>
    ),
    [tasks.length]
  );
}

AddTask.propTypes = {
  taskCount: PropTypes.number
};

export default AddTask;
