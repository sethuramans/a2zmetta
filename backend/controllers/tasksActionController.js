const db = require('../config/db');


exports.save = async (req, res) => {
  const { userId = 0, taskId = 0, action = '' } = req.body;

  process.env.DEBUG === 'Y' && console.log(`TasksAction controller > save: userid ${userId}, tasksid ${taskId}`);
  try {
    db.query('INSERT INTO tasks_actions (user_id, task_id, action) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE action = VALUES(action)', [userId, taskId, action], (err, results) => {
      process.env.DEBUG === 'Y' && console.log('TasksAction controller > retrieve: Error', err);
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(200).json({ message: 'Tasks action updated successful'});
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.list = async(req, res) => {
    const { userid = 0 } = req.body;
    process.env.DEBUG === 'Y' && console.log(`TasksAction controller > list: userid ${userid}`);
    try {
      db.query('SELECT * FROM tasks_actions WHERE user_id = ?', [userid], (err, results) => {
        process.env.DEBUG === 'Y' && console.log('TasksAction controller > retrieve: Error', err);
        if (err) return res.status(500).json({ error: 'Database error' });
        const tasksAction = res;
        res.status(200).json({ message: "Tasks actions retrieved successfully!", tasksAction});
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};