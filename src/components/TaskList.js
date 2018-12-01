import React from "react";
import PropTypes from "prop-types";

import TaskListItem from "./TaskListItem";

export function TaskList({ tasks = [] }) {
  const emptyMessage = <div className="list__empty-message">No items</div>;
  const items = tasks.map((item, index) => (
    <TaskListItem key={index} {...item} />
  ));
  return (
    <div className="list">{tasks.length === 0 ? emptyMessage : items}</div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array
};

export default TaskList;
