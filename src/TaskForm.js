import React, { useState } from "react";

import "./TaskForm.css";
import LeafletMap from "./LeafletMap";
import { postData } from "./utils";
import { HOST } from "./constants";

import FeafletMap from "./containers/Map";

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
    let { value, name, type } = e.target;
    setInput({
      ...inputs,
      [name]: type === "text" ? value : Number(value)
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
        crs,
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

  const [test, setTest] = useState("");

  return (
    <div className="task-form">
      <div className="task-form__map">
        <FeafletMap polygon={polygon} onSetPolygon={onSetPolygon} />
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
