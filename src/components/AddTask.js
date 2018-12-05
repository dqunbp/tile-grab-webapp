import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";

import { TasksContext } from "./App";

export function AddTask() {
  const { toggleTaskForm, tasks, newTask } = useContext(TasksContext);
  return useMemo(
    () => (
      <div className="add-task">
        <div className="add-task__total">Total: {tasks.length}</div>
        <div className="add-task__btn">
          <button
            className="input btn"
            onClick={toggleTaskForm}
            disabled={newTask}
          >
            Add Task
          </button>
        </div>
      </div>
    ),
    [tasks.length, newTask]
  );
}

AddTask.propTypes = {
  taskCount: PropTypes.number
};

export default AddTask;
