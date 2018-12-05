import React, { useCallback } from "react";
import classnames from "classnames";

export function StatusIndicator({ status, progress }) {
  const getClassName = useCallback(
    status =>
      classnames("indicator", {
        "indicator--success": status === 3,
        "indicator--pending": status === 1,
        "indicator--failure": status === -1
      }),
    []
  );

  return (
    <div className="status-indicator">
      <div title={`${progress}%`} className={getClassName(status)} />
    </div>
  );
}

export default StatusIndicator;
