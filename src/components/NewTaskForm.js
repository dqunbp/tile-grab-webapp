import React, { useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "./Input";
import Select, { Option } from "./Select";
import { useInput } from "../hooks";

export function NewTaskForm({ onCancel, onSubmit, onClear }) {
  const formRef = useRef();

  const inputs = [
    useInput(""),
    useInput(""),
    useInput(14),
    useInput(0.5),
    useInput("epsg:3857")
  ];

  const [name, url, zoom, timeout, crs] = inputs;

  const clear = useCallback(() => inputs.forEach(({ reset }) => reset()), []);

  const clearForm = useCallback(() => {
    clear();
    onClear();
  }, []);

  const resetForm = useCallback(() => {
    clear();
    onCancel();
  }, []);

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      let newTask = {};
      inputs.forEach(({ ref, value }) => {
        let { name } = ref.current;
        newTask[name] = value;
      });
      onSubmit(newTask);
    },
    [...inputs]
  );

  return (
    <form ref={formRef} className="form" onSubmit={submitForm}>
      <Input
        {...name.bindToInput}
        autoFocus
        type="text"
        name="name"
        label="Name"
        required
      />
      <Input {...url.bindToInput} type="url" name="url" label="Url" required />
      <Input
        {...zoom.bindToInput}
        type="number"
        min={5}
        max={19}
        name="zoom"
        label="Zoom"
        required
      />
      <Input
        {...timeout.bindToInput}
        type="number"
        min={0}
        step={0.5}
        name="timeout"
        label="Timeout"
        required
        pattern="^[0-9]"
      />
      <Select {...crs.bindToInput} name="crs" label="Crs" required>
        <Option value="epsg:3857">Web Mercator</Option>
        <Option value="epsg:3395">World Mercator</Option>
      </Select>
      <div className="form__submit">
        <button
          // className="btn btn--flex"
          type="submit"
        >
          <FontAwesomeIcon icon="check-circle" />
        </button>
        <button
          // className="btn btn--flex"
          type="button"
        >
          <FontAwesomeIcon onClick={clearForm} icon="eraser" />
        </button>
        <button
          // className="btn btn--flex"
          type="button"
        >
          <FontAwesomeIcon onClick={resetForm} icon="times-circle" />
        </button>
      </div>
    </form>
  );
}

export default NewTaskForm;
