import React, { useState } from "react";

import TaskList from "../../components/TaskList";
import AddTask from "../../components/AddTask";
import Map from "../Map";
import TaskFormModal from "../TaskFormModal";

export function App() {
  const [isOpen, setToggleModal] = useState(false);
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <TaskList />
          <AddTask openModal={setToggleModal} taskCount={3} />
        </div>
        <TaskFormModal isOpen={isOpen} toggleModal={setToggleModal} />
        <Map />
      </div>
    </div>
  );
}

export default App;
