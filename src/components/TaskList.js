import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";

import TaskListItem from "./TaskListItem";
import { TasksContext } from "./App";
import NewTask from "./NewTask";

export function TaskList() {
  const { tasks, newTask } = useContext(TasksContext);
  const emptyMessage = useMemo(
    () => <div className="list__empty-message">No items</div>,
    []
  );
  const renderNewTask = useMemo(() => <NewTask />, []);
  const items = tasks.map((item, index) => (
    <TaskListItem key={index} {...item} />
  ));
  return (
    <div className="list">
      {newTask && renderNewTask}
      {tasks.length === 0 ? !newTask && emptyMessage : items}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array
};

export default TaskList;
