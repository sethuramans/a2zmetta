const express = require("express");
const db = require('../config/db');

const {dbtables} = require('../utils/constants');

// ✅ Save reward points in the database
exports.save = async (req, res) => {
  const { userId, points, reason = 'mining' } = req.body;

  if (!userId || !points) {
    return res.status(400).json({ message: "User ID and points are required" });
  }

  try {
  const query = `INSERT INTO ${dbtables.REWARDS} (user_id, points, reason, updated_at) VALUES (?, ?, ?, NOW())`;
   db.query(query, [userId, points, reason], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error saving rewards' });
      res.status(200).json({ message: "Points saved successfully!", result });
    });
    
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTotalRewards = async (req, res) => {
  const {id: userId = null} = req.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
  const query = `SELECT SUM(points) AS totalRewards FROM ${dbtables.REWARDS} where user_id = ?`;
   db.query(query, [userId], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error returning total points' });
      
      process.env.DEBUG === 'Y' && console.log(`Rewards > total : userId ${userId}, result `, result);

      const {totalRewards = 0} = result.length > 0 ? result[0] :[];
      res.status(200).json({ message: "Total rewards retrieved successfully!",  totalRewards});
    });
    
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};