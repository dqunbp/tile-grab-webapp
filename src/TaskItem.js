import React from "react";
import moment from "moment";

import "./TaskItem.css";
import { HOST } from "./constants";

export function TaskItem({
  id,
  name,
  progress,
  status,
  error_message: errorMsg
}) {
  const downloadFile = e => {
    e.preventDefault();
    window.open(`${HOST}/download/${id}`, "_blank");
  };
  return (
    <div className="task-list-item">
      <div>
        <h3 className="task-list-item__date">
          {moment.unix(id).format("YYYY-MM-DD HH:mm:ss")}
        </h3>
        <span className="task-list-item__error">{errorMsg}</span>
      </div>
      <div>{name}</div>
      <div>{`progress: ${progress}%`}</div>
      <div>
        <button
          className="btn btn--link"
          disabled={errorMsg || status !== 3}
          onClick={downloadFile}
        >
          download tiff
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
