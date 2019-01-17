import React, { useState, useCallback, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TasksContext } from "./App";
import NewTaskForm from "./NewTaskForm";
import { resetNewTask, resetAll } from "../reducer";

import { apiClient } from "../utils";

export function NewTask() {
  const { dispatch, polygon } = useContext(TasksContext);
  const [isOpen, setIsOpen] = useState(false);
  const onClear = useCallback(() => dispatch(resetNewTask()));
  const onCancel = useCallback(() => {
    dispatch(resetAll());
    setIsOpen(false);
  }, []);
  const onSubmit = useCallback(
    newTask => {
      if (polygon) {
        const { name, ...restValues } = newTask;
        const body = {
          name,
          parameters: {
            ...restValues,
            delete_tiles: true,
            extent: polygon.geometry
          }
        };
        apiClient
          .post("/create", body)
          .then(response => {
            console.log(response);
            dispatch(resetNewTask());
            setIsOpen(false);
          })
          .catch(error => console.error(error));
        console.log(body);
      } else {
        alert("Select target area pls!");
      }
    },
    [polygon]
  );

  useEffect(() => polygon && setIsOpen(true), [polygon]);

  return (
    <div
      className="list-item list-item--new"
      style={isOpen ? { height: "490px" } : {}}
    >
      {!isOpen ? (
        <FontAwesomeIcon onClick={() => setIsOpen(true)} icon="plus" />
      ) : (
        <NewTaskForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          onClear={onClear}
        />
      )}
    </div>
  );
}

export default NewTask;
