const express = require("express");
const db = require('../config/db');

const dbTables = require('../utils/constants/dbTables');

// ✅ Save reward points in the database
exports.save = async (req, res) => {
  const { userId, points, reason = 'mining' } = req.body;

  if (!userId || !points) {
    return res.status(400).json({ status:'error', message: "User ID and points are required" });
  }

  try {
    const query = `
      INSERT INTO ${dbTables.REWARDS} (user_id, points, reason, updated_at)
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(query, [userId, points, reason]);

    res.status(200).json({
      status:'success', 
      message: "Points saved successfully!",
      result,
    });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({status:'error',  message: "Server error" });
  }
};



exports.getTotalRewards = async (req, res) => {
  const { id: userId = null } = req.user;
  if (!userId) {
    return res.status(400).json({status:'error',  message: "User ID is required" });
  }

  try {
    const query = `
      SELECT SUM(points) AS totalRewards
      FROM ${dbTables.REWARDS}
      WHERE user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);

    const totalRewards = rows.length > 0 ? rows[0].totalRewards || 0 : 0;

    res.status(200).json({
      status: "success",
      message: "Total rewards retrieved successfully!",
      totalRewards,
    });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
