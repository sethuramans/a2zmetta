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
    <div  id='task-list'>
      <h2>📋 Task List</h2>

    
      <div className="p-0 my-4">
        {tasks && tasks.map((task) => {
          const {id, title, url, btnText, action, style, helpText} = task;
          const recentLinkObj = tasks_links.find((taskLink) => id === taskLink.task_id);
          const recentLink = recentLinkObj && recentLinkObj.link;
          return (
            <>
              <div className={`d-flex border p-3 mb-3 rounded-3 left-border-highlight border-${style}`}>
                <div className="me-3 d-flex align-items-center">
                  <i className={`bi bi-${style} fs-1 `}></i>
                </div>

                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="mb-1"> {title}</h5>
                    {helpText && (<p className="mb-2 text-dark">
                     {helpText}
                    </p>)}
                  </div>

                  <div className="d-flex justify-content-end gap-2">
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
                      href="#"
                      onClick={() => window.open(recentLink, "_blank")}
                    >
                      <span className="bi bi-eye img-circle btn-glyphicon glyphicon text-info"></span>
                      View
                    </a>
                  </div>
                </div>
              </div>

            </>
          );
        }
        
        )}
      </div>
    </div>
    
  );
};

export default TaskList;
