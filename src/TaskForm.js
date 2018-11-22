import React, { useState } from "react";

import "./TaskForm.css";
import LeafletMap from "./LeafletMap";
import { postData } from "./utils";
import { HOST } from "./constants";

export function TaskForm({ onSubmit }) {
  // const [error, setError] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [crs, setCrs] = useState("epsg:3857");
  const [inputs, setInput] = useState({
    url: "",
    zoom: 14,
    timeout: 0.5,
    name: ""
  });

  const handleInputChange = function(e) {
    let { value, name } = e.target;
    let numValue = Number(value);
    setInput({
      ...inputs,
      [name]: isNaN(numValue) ? value : numValue
    });
  };

  const prepareRequestBody = function() {
    let { name, url, zoom, timeout } = inputs;
    return {
      name,
      parameters: {
        url,
        zoom,
        timeout,
        delete_tiles: true,
        extent: polygon.toGeoJSON().geometry
      }
    };
  };

  const onSubmitForm = function(e) {
    e.preventDefault();
    // TODO validate form data
    console.log(prepareRequestBody());
    postData(`${HOST}/create`, prepareRequestBody());
    onSubmit();
  };

  const onSetPolygon = polygon => {
    setPolygon(polygon);
  };

  return (
    <div className="task-form">
      <div className="task-form__map">
        <LeafletMap polygon={polygon} onSetPolygon={onSetPolygon} />
      </div>
      <form onSubmit={onSubmitForm} className="task-form__inputs">
        <label>Url</label>
        <input
          autoFocus={true}
          type="text"
          name="url"
          value={inputs.url}
          onChange={handleInputChange}
        />
        <label>Zoom</label>
        <input
          type="number"
          name="zoom"
          min={5}
          max={19}
          value={inputs.zoom}
          onChange={handleInputChange}
        />
        <label>Timeout</label>
        <input
          type="number"
          name="timeout"
          min={0}
          step={0.1}
          value={inputs.timeout}
          onChange={handleInputChange}
        />
        <label>CRS</label>
        <select value={crs} onChange={e => setCrs(e.target.value)}>
          <option value="epsg:3857">Web Mercator</option>
          <option value="epsg:3395">World Mercator</option>
        </select>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleInputChange}
        />
        <button type="submit">Start!</button>
      </form>
    </div>
  );
}

export default TaskForm;
