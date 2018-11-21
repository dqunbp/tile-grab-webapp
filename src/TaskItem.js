import React from 'react'
import './TaskItem.css'

export function TaskItem({ 
  id,
  name,
  progress,
  status,
  error_message: errorMsg
}) {
  const downloadFile = (e) => {
    e.preventDefault()
    window.open('localhost', "_blank")
  }
  return (
    <li>
      {`${id} ${name} progress: ${progress}%`}
      &nbsp;
      <button
        className="btn btn--link" 
        disabled={errorMsg || status !== 3}
        onClick={downloadFile}>
        download tiff
      </button>
      &nbsp;
      <span className="task-item-error">
        {errorMsg}
      </span>
    </li>
  )
}

export default TaskItem