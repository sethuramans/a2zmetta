// src/components/TaskList.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import {saveTaskActions} from '../services/api';
import Loader from "./Loader";
import {getTasks} from '../services/api';
const TaskList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, loading, error, tasks_links } = useSelector((state) => state.tasks);
  //const  task_links  = useSelector((state) => state.tasks_links);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTasks();
        console.log('Tasks:', res); // Check if data is returned
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAction = async (taskId, url) => {
    try {
      await saveTaskActions({ taskId, action: 'Y', userId: user?.id });
      dispatch(fetchTasks());
      window.open(url, "_blank")
      console.log(`✅ Task ${taskId} sent successfully!`);
    } catch (err) {
      console.error(err);
      console.log(`❌ Failed to send task ${taskId}`);
    }
  };

  console.log(tasks, tasks_links);

  if (loading) return <Loader message='Loading tasks...'/>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }} id='task-list'>
      <h2>📋 Task List</h2>

    
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks && tasks.map((task) => {
          const {id, title, url, btnText, action} = task;
          const recentLinkObj = tasks_links.find((taskLink) => id === taskLink.task_id);
          const recentLink = recentLinkObj && recentLinkObj.link;
          return (
            <li
              key={id}
              style={{
                margin: "15px 0",
                padding: "10px",
                border: "1px solid #ccc",
              }}
              className="justify-content-between d-flex rounded-3 flex-wrap"
            >
              <h3>{title}</h3>
              <div className="action icons w-100 d-flex justify-content-end">
                {!action && (
                  <a
                    className="btn btn-dark icon-btn mx-1 "
                    href="#"                    
                    onClick={() => handleAction(id, url)}
                  >
                    <span className="bi bi-hand-thumbs-up img-circle btn-glyphicon glyphicon text-primary"></span>
                    {btnText}
                  </a>
                )}

                <a
                  className="btn btn-info icon-btn mx-1"
                  href='#'
                  onClick={() => window.open(recentLink, "_blank")}
                >
                  <span className="bi bi-eye img-circle btn-glyphicon glyphicon text-info"></span>
                  View 
                </a>
              </div>
            </li>
          );
        }
        
        )}
      </ul>
    </div>
  );
};

export default TaskList;
