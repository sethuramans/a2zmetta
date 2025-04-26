const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Login via Telegram
exports.telegramLogin = async (req, res) => {
  const { user = {} } = req.body;
  //const {user = {}} = initData;
  const {telegramId, username} = user;

  process.env.DEBUG === 'Y' && console.log(`AuthController > Login: telegram_id ${telegramId}, username ${username}`);
  try {
    // Check if the user exists
    db.query('SELECT * FROM users WHERE telegram_id = ?', [telegramId], (err, results) => {
      process.env.DEBUG === 'Y' && console.log('AuthController > Login: Error', err);
      if (err) return res.status(500).json({ error: 'Database error' });

      if (results.length > 0) {
        // User found, generate token
        const user = results[0];
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: '365d',//'1h',
        });
        res.status(200).json({ message: 'Login successful', token, user });
      } else {
        // User not found, register new user
        db.query(
          'INSERT INTO users (telegram_id, username) VALUES (?, ?)',
          [telegramId, username],
          (err, result) => {
            if (err) return res.status(500).json({ error: 'Error saving user' });

            
            const uniqueId = result.insertId;
            const user = {

              id: uniqueId,
              username: username,
              telegram_id: telegramId
            };
            // Generate token for new user
            const token = jwt.sign({ id: uniqueId, username }, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });
            res.status(201).json({ message: 'User registered successfully', token, user });
          }
        );
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
