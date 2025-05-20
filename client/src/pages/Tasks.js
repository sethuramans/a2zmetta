import React from "react";
import TaskList from "../components/TasksList";
import Header from "../components/Header";

function Tasks() {
  return (
    <section id="tasks" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
        <Header title="Tasks" />
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
