const express = require("express");
const db = require('../config/db');

const {dbtables} = require('../utils/constants');

// ✅ Get the list of tasks
exports.list = async (req, res) => {
  
  const {id: userId = null} = req.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  process.env.DEBUG === 'Y' && console.log(`TasksAction controller > list: userid ${userId}`);
  

  try {
    //const query = "SELECT * FROM tasks WHERE is_disabled = 'N' ORDER BY seq ASC";
  const query = `
  SELECT t.id, t.title, t.url, t.action_text as btnText, ta.action FROM ${dbtables.TASKS} as t LEFT JOIN ${dbtables.TASKS_ACTION} AS ta ON t.id = ta.task_id AND ta.user_id = ? WHERE t.is_disabled = 'N' ORDER BY t.seq ASC;
  SELECT t.* FROM ${dbtables.TASKS_LINKS} t JOIN ( SELECT task_id, MAX(created_on) AS latest FROM ${dbtables.TASKS_LINKS} GROUP BY task_id ) r ON t.task_id= r.task_id AND t.created_on = r.latest;
  `;
   db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error returning tasks list', err });
      
      process.env.DEBUG === 'Y' && console.log(`Tasks List and links`, results);
      
      const tasks_links = results[1].length > 0 ? results[1] : [];
      const cnt = results[0].length;
      const tasks = cnt > 0 ? results[0] : [];
      res.status(200).json({ message: "Tasks successfully retrieved!",  tasks, cnt, tasks_links});
    });
    
    
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};