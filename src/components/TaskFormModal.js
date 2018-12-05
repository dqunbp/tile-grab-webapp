import React, { useContext, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import Input from "./Input";
import Select, { Option } from "./Select";
import { TasksContext } from "./App";
import { setNewTask } from "../reducer";
import { useInput } from "../hooks";

const modalStyles = {
  overlay: { zIndex: 1000 }
};
Modal.setAppElement("#root");

export function TaskFormModal({ isOpen, closeModal }) {
  const { dispatch, newTask } = useContext(TasksContext);

  const formRef = useRef();

  const inputs = [
    useInput(""),
    useInput(14),
    useInput(0.5),
    useInput("epsg:3857")
  ];

  const [url, zoom, timeout, crs] = inputs;

  useEffect(
    () => {
      !newTask && inputs.forEach(({ reset }) => reset());
    },
    [newTask]
  );

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      let newTask = {};
      inputs.forEach(({ ref, value }) => {
        let { name } = ref.current;
        newTask[name] = value;
      });
      dispatch(setNewTask(newTask));
      closeModal();
    },
    [...inputs]
  );

  return (
    <Modal
      className="modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="TaskFormModal"
      closeTimeoutMS={200}
    >
      <div>
        <h2>Task Form</h2>
        <form ref={formRef} className="form" onSubmit={submitForm}>
          <Input
            autoFocus
            type="url"
            name="url"
            label="Url"
            required
            {...url.bindToInput}
          />
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
            <input className="input btn btn--flex" type="submit" value="Save" />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default TaskFormModal;
