import React from "react";
import TaskList from "../components/TasksList";
import Header from "../components/Header";

function Tasks() {
  return (
    <div id="tasks" className="">
      <Header title="Tasks" />
      <div className="main-content container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
