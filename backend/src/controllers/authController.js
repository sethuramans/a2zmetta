const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dbTables = require('../utils/constants/dbTables');

// Login via Telegram
exports.telegramLogin = async (req, res) => {
  const { user = {} } = req.body;
  //const {user = {}} = initData;
  const {telegramId, username, referredBy = 0} = user;

  process.env.DEBUG === 'Y' && console.log(`AuthController > Login: telegram_id ${telegramId}, username ${username}`);
  try {
    // Check if the user exists
    db.query(`SELECT * FROM ${dbTables.USER} WHERE telegram_id = ?`, [telegramId], (err, results) => {
      process.env.DEBUG === 'Y' && console.log('AuthController > Login: , hasResults', err, results.length);
      if (err) return res.status(500).json({ error: 'Database error' });

      if (results.length > 0) {
        // User found, generate token
        const user = results[0];
        process.env.DEBUG === 'Y' && console.log('AuthController > Login: has user', user.id);
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: '365d',//'1h',
        });
        res.status(200).json({ message: 'Login successful', token, user });
      } else {
        // User not found, register new user
        process.env.DEBUG === "Y" &&
          console.log("AuthController > Login: new user", telegramId, username);


        db.query(
          `INSERT INTO ${dbTables.USER} (telegram_id, username, referred_by) VALUES (?, ?)`,
          [telegramId, username, referredBy],
          (err, result) => {
            
        process.env.DEBUG === "Y" &&
        console.log("AuthController > Login: new user Error", err);
        
            if (err) return res.status(500).json({ error: 'Error saving user' });

            
            const uniqueId = result.insertId;
            
        process.env.DEBUG === "Y" &&
          console.log("AuthController > Login: new user id", uniqueId);
            const user = {

              id: uniqueId,
              username: username,
              telegram_id: telegramId
            };
            // Generate token for new user
            const token = jwt.sign({ id: uniqueId, username }, process.env.JWT_SECRET, {
              expiresIn: '365d',
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
