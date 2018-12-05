import React, { useMemo, useCallback, useContext } from "react";

import { useInput } from "../hooks";
import { TasksContext } from "./App";

import { apiClient } from "../utils";
import { resetNewTask } from "../reducer";

export function NewTask() {
  const { dispatch, toggleTaskForm, newTask, polygon } = useContext(
    TasksContext
  );
  const name = useInput("");
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (polygon) {
        const body = {
          name: name.value,
          parameters: {
            ...newTask,
            delete_tiles: true,
            extent: polygon.geometry
          }
        };
        apiClient
          .post("/create", body)
          .then(response => {
            console.log(response);
            dispatch(resetNewTask());
          })
          .catch(error => console.error(error));
        console.log(body);
      } else {
        alert("Select target area pls!");
      }
    },
    [newTask, polygon, name]
  );

  return useMemo(
    () => {
      return (
        <div className="list-item list-item--new">
          <form className="newtask-form" onSubmit={onSubmit}>
            <div className="list-item__content">
              <div className="list-item__title">
                <input
                  className="input list-item__input"
                  required
                  placeholder="Enter task name"
                  {...name.bindToInput}
                />
              </div>
            </div>
            <div className="list-item__buttons">
              <button
                type="button"
                className="icon-btn"
                onClick={toggleTaskForm}
              >
                e
              </button>
              <button type="submit" className="icon-btn">
                d
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => dispatch(resetNewTask())}
              >
                c
              </button>
            </div>
          </form>
        </div>
      );
    },
    [name]
  );
}

export default NewTask;
