import React, { useContext } from "react";

import TaskListItem from "./TaskListItem";
import { TasksContext } from "./App";
import NewTask from "./NewTaskContainer";

export function TaskList() {
  const { tasks } = useContext(TasksContext);
  const emptyMessage = <div className="list__empty-message">No items</div>;
  const items = tasks.map((item, index) => (
    <TaskListItem key={index} {...item} />
  ));
  return (
    <>
      <NewTask />
      <div className="list">{tasks.length === 0 ? emptyMessage : items}</div>
    </>
  );
}

export default TaskList;
