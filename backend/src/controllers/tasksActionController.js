const db = require('../config/db');
const dbTables = require('../utils/constants/dbTables');


exports.save = async (req, res) => {
  const { userId = 0, taskId = 0, action = '' } = req.body;

  if (!userId || !taskId) {
    return res.status(400).json({ status:'error', error: 'userId and taskId are required' });
  }

  try {
    const query = `
      INSERT INTO ${dbTables.TASKS_ACTION} (user_id, task_id, action)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE action = VALUES(action)
    `;
    await db.query(query, [userId, taskId, action]);

    res.status(200).json({status:'success',  message: 'Task action updated successfully' });
  } catch (error) {
    console.error('TasksAction save error:', error);
    res.status(500).json({ status:'error', error: 'Internal server error' });
  }
};



exports.list = async (req, res) => {
  const { userid = 0 } = req.body;

  if (!userid) {
    return res.status(400).json({ error: 'userid is required' });
  }

  try {
    const query = `SELECT * FROM ${dbTables.TASKS_ACTION} WHERE user_id = ?`;
    const [tasksAction] = await db.query(query, [userid]);

    res.status(200).json({
      status:'success', 
      message: "Task actions retrieved successfully!",
      tasksAction,
    });
  } catch (error) {
    console.error('TasksAction list error:', error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};
