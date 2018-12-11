import React, { useMemo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import StatusIndicator from "./StatusIndicator";
import { backendUrl } from "../constants";
import axios from "axios";

export function TaskListItem({
  id,
  name,
  progress,
  status,
  error_message: errorMsg
}) {
  const downloadFile = useDownloadLink(id);
  const removeTask = useApiCall("delete/");

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
            <button
              type="button"
              className="icon-btn"
              onClick={() => removeTask.call(id)}
              disabled={status !== 3}
            >
              remove
            </button>
          </div>
        </div>
      );
    },
    [progress]
  );
}

TaskListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  error_message: PropTypes.string
};

function useDownloadLink(id) {
  return useCallback(
    e => {
      e.preventDefault();
      window.open(`${backendUrl}/download/${id}`, "_blank");
    },
    [id]
  );
}

function useApiCall(url) {
  let [state, setState] = useState({
    pending: false,
    error: null
  });
  return {
    pending: state.pending,
    error: state.error,
    call: useCallback(id => {
      setState({
        pending: true,
        error: null
      });
      axios
        .get(`${backendUrl}/${url}${id}`)
        .then(response => {
          setState({ ...state, pending: false });
          return response.data;
        })
        .catch(error => {
          setState({ error, pending: false });
        });
    }, [])
  };
}

export default TaskListItem;
