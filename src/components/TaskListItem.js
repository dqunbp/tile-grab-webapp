import React, { useMemo } from "react";
import PropTypes from "prop-types";

export function TaskListItem({
  id,
  name,
  progress,
  status,
  error_message: errorMsg
}) {
  return useMemo(
    () => {
      return <div className="list-item">{`list item with id: ${id}`}</div>;
    },
    [id, name, progress, status, errorMsg]
  );
}

TaskListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  error_message: PropTypes.string
};

export default TaskListItem;
