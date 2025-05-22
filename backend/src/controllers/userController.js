const db = require('../config/db');
const dbTables = require('../utils/constants/dbTables');



exports.getFriends = async (req, res) => {
  const userId = req.user?.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

  try {
    const [data] = await db.query(
      `SELECT id, username, phonenumber, displayname FROM ${dbTables.USER} WHERE referred_by = ? LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    const [countRes] = await db.query(
      `SELECT COUNT(*) as total FROM ${dbTables.USER} WHERE referred_by = ?`,
      [userId]
    );

    res.status(200).json({
      friends: data,
      total: countRes[0].total,
      page,
      limit,
      status: 'sucess',
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Server error", error: err.message });
  }
};

// Update user profile
exports.save = async (req, res) => {
  const { id: userId } = req.user;
  const { displayname, email } = req.body;

  if (!userId || !displayname || !email) {
    return res.status(400).json({ status: 'error', error: 'Missing fields' });
  }

  const updateQuery = `
    UPDATE ${dbTables.USER}
    SET displayname = ?, email = ?
    WHERE id = ?;
  `;
  const params = [displayname, email, userId];

  try {
    process.env.DEBUG === 'Y' && console.log('Updating user:', userId, displayname, email);

    const [results] = await db.query(updateQuery, params);

    if (results.affectedRows === 0) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    process.env.DEBUG === 'Y' && console.log('Update success');
    return res.status(200).json({ status: 'success', message: 'Profile updated successfully' });

  } catch (err) {
    process.env.DEBUG === 'Y' && console.error('DB Error:', err);
    return res.status(500).json({ status: 'error', error: 'Database error' });
  }
};

