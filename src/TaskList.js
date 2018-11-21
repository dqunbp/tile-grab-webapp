import React from 'react'
import TaskItem from './TaskItem'

export function TaskList({ data = [] }) {

  const emptyMessage = <p>No items</p>
  const items = data.map((item, index) => (
    <TaskItem key={index} {...item} />
  ))

  return (
    data.length > 0 ? <ul>{items}</ul> : emptyMessage
  )
}

export default TaskList