import React, { useMemo } from "react";
import PropTypes from "prop-types";

export function AddTask({ openModal, taskCount = 0 }) {
  return useMemo(
    () => (
      <div className="add-task">
        <div className="add-task__total">Total: {taskCount}</div>
        <div className="add-task__btn">
          <button className="input btn" onClick={() => openModal(true)}>
            Add Task
          </button>
        </div>
      </div>
    ),
    [taskCount]
  );
}

AddTask.propTypes = {
  taskCount: PropTypes.number
};

export default AddTask;
