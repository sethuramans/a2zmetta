import React from "react";
import TaskList from "../components/TasksList";

function Tasks() {
  return (
    <section id="tasks" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
        <div className="banner-img">
          <h2 className="text-center mb-4 text-white">Tasks</h2>
        </div>
        <div className="content">
        <div className="row align-items-center">
          <div className="col-md-12">
            <TaskList />
          </div>
        </div>
        </div>
        
      </div>
    </section>
  );
}

export default Tasks;
