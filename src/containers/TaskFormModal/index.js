import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import Input from "../../components/Input";
import Select, { Option } from "../../components/Select";

const modalStyles = {
  overlay: { zIndex: 1000 }
};
Modal.setAppElement("#root");

export function TaskFormModal({ isOpen, toggleModal }) {
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  const [url, zoom, timeout, crs] = inputs;

  function submitForm(e) {
    e.preventDefault();
    inputs.forEach(({ current: { name, value } = {} }) =>
      console.log(`name: ${name} value: ${value}`)
    );
  }

  return (
    <Modal
      className="modal"
      isOpen={isOpen}
      onRequestClose={() => toggleModal(!isOpen)}
      style={modalStyles}
      contentLabel="TaskFormModal"
      closeTimeoutMS={200}
    >
      <div>
        <h2>Task Form</h2>
        <form className="form" onSubmit={submitForm}>
          <Input
            autoFocus
            ref={url}
            type="url"
            name="url"
            label="Url"
            required
          />
          <Input
            ref={zoom}
            type="number"
            min={5}
            max={19}
            name="zoom"
            label="Zoom"
            required
          />
          <Input
            ref={timeout}
            type="number"
            min={0}
            step={0.5}
            name="timeout"
            label="Timeout"
            required
            pattern="^[0-9]"
          />
          <Select ref={crs} initialValue="epsg:3857" name="crs" label="Crs">
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
