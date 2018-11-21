import React, { useState } from 'react'
import LeafletMap from './LeafletMap'
import './TaskForm.css'

export function TaskForm({ onSubmit }) {

  const [crs, setCrs] = useState('crs-2')
  const [inputs, setInput] = useState({
    url: '',
    zoom: 14,
    timeout: 0.5,
    name: ''
  })

  const handleInputChange = function(e) {
    let { value, name } = e.target
    setInput({
      ...inputs,
      [name]: value
    })
  }

  const onSubmitForm = function() {
    onSubmit({
      crs,
      ...inputs
    })
  }

  return (
    <div className="task-form">
      <div className="task-form__map">
        <LeafletMap />
      </div>
      <form onSubmit={onSubmitForm} className="task-form__inputs">
        <label >Url</label>
        <input autoFocus={true} type="text" name="url" value={inputs.url} onChange={handleInputChange} />
        <label >Zoom</label>
        <input type="number" name="zoom" min={5} max={19} value={inputs.zoom} onChange={handleInputChange} />
        <label >Timeout</label>
        <input type="number" name="timeout" min={0} step={.1} value={inputs.timeout} onChange={handleInputChange} />
        <label >CRS</label>
        <select value={crs} onChange={setCrs}>
          <option value="crs-1">crs-1</option>
          <option value="crs-2">crs-2</option>
        </select>
        <label >Name</label>
        <input type="text" name="name" value={inputs.name} onChange={handleInputChange} />
        <button type="submit">Start!</button>
      </form>
    </div>
  )
}

export default TaskForm