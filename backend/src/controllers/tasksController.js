const express = require("express");
const db = require('../config/db');

const dbTables = require('../utils/constants/dbTables');

// ✅ Get the list of tasks
exports.list = async (req, res) => {
  const { id: userId = null } = req.user;
  if (!userId) {
    return res.status(400).json({status:'error',  message: "User ID is required" });
  }

  const query = `
    SELECT t.id, t.title, t.url, t.action_text as btnText, t.style as style, t.help_text as helpText,  ta.action
    FROM ${dbTables.TASKS} as t
    LEFT JOIN ${dbTables.TASKS_ACTION} AS ta
      ON t.id = ta.task_id AND ta.user_id = ?
    WHERE t.is_disabled = 'N'
    ORDER BY t.seq ASC;
    
    SELECT t.*
    FROM ${dbTables.TASKS_LINKS} t
    JOIN (
      SELECT task_id, MAX(created_on) AS latest
      FROM ${dbTables.TASKS_LINKS}
      GROUP BY task_id
    ) r ON t.task_id = r.task_id AND t.created_on = r.latest;
  `;

  try {
    const [results] = await db.query(query, [userId]);

    const tasks = results[0] || [];
    const tasks_links = results[1] || [];

    return res.status(200).json({status:'success', 
      message: "Tasks successfully retrieved!",
      tasks,
      cnt: tasks.length,
      tasks_links,
    });
  } catch (error) {
    console.error("DB Error:", error);
    return res.status(500).json({ status:'error', message: "Server error" });
  }
};

exports.listold = async (req, res) => {
  

  const {id: userId = null} = req.user;
  if (!userId) {
    return res.status(400).json({ status:'error', message: "User ID is required" });
  }

  process.env.DEBUG === 'Y' && console.log(`TasksAction controller > list: userid ${userId}`);
  

  try {
    //const query = "SELECT * FROM tasks WHERE is_disabled = 'N' ORDER BY seq ASC";
  const query = `
  SELECT t.id, t.title, t.url, t.action_text as btnText, ta.action FROM ${dbTables.TASKS} as t LEFT JOIN ${dbTables.TASKS_ACTION} AS ta ON t.id = ta.task_id AND ta.user_id = ? WHERE t.is_disabled = 'N' ORDER BY t.seq ASC;
  SELECT t.* FROM ${dbTables.TASKS_LINKS} t JOIN ( SELECT task_id, MAX(created_on) AS latest FROM ${dbTables.TASKS_LINKS} GROUP BY task_id ) r ON t.task_id= r.task_id AND t.created_on = r.latest;
  `;
  process.env.DEBUG === 'Y' && console.log(`TasksAction controller > list: query ${query}`);
  
   db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ status:'error', message: 'Error returning tasks list', err });
      
      process.env.DEBUG === 'Y' && console.log(`Tasks List and links`, results);
      
      const tasks_links = results[1].length > 0 ? results[1] : [];
      const cnt = results[0].length;
      const tasks = cnt > 0 ? results[0] : [];
      res.status(200).json({ status:'success', message: "Tasks successfully retrieved!",  tasks, cnt, tasks_links});
    });
    
    
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ status:'error', message: "Server error" });
  }
};