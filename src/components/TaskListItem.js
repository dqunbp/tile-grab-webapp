import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import StatusIndicator from "./StatusIndicator";
import { backendUrl } from "../constants";

export function TaskListItem({
  id,
  name,
  progress,
  status,
  error_message: errorMsg
}) {
  const downloadFile = useCallback(
    e => {
      e.preventDefault();
      window.open(`${backendUrl}/download/${id}`, "_blank");
    },
    [id]
  );

  const removeTask = useCallback(
    e => {
      e.preventDefault();
      window.open(`/delete/${id}`, "_blank");
    },
    [id]
  );

  return useMemo(
    () => {
      return (
        <div className="list-item">
          <div className="list-item__content">
            <StatusIndicator status={status} progress={progress} />
            <div>
              <div className="list-item__title">{name}</div>
              <div className="list-item__date">
                {moment.unix(id).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
          </div>
          <div className="list-item__buttons">
            <button
              className="icon-btn"
              onClick={downloadFile}
              disabled={errorMsg || status !== 3}
            >
              download
            </button>
            <button className="icon-btn" onClick={removeTask}>
              remove
            </button>
          </div>
        </div>
      );
    },
    [id, name, progress, status, errorMsg]
  );
}

TaskListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  error_message: PropTypes.string
};

export default TaskListItem;
