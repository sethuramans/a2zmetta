const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const dbTables = require("../utils/constants/dbTables");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const REFERRAL_POINTS = 10;

// Login via Telegram
exports.telegramLogin = async (req, res) => {
  const { user = {} } = req.body;
  const { telegramId, username, referredBy = 0 } = user;

  if (!telegramId || !username) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing required user info" });
  }

  try {
    // 1. Check if user exists
    const [existingUsers] = await db.query(
      `SELECT * FROM ${dbTables.USER} WHERE telegram_id = ?`,
      [telegramId]
    );

    if (existingUsers.length > 0) {
      // 2. If found, generate token and return
      const existingUser = existingUsers[0];
      const token = jwt.sign(
        { id: existingUser.id, username: existingUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "365d" }
      );
      return res
        .status(200)
        .json({
          status: "success",
          message: "Login successful",
          token,
          user: existingUser,
        });
    }

    // 3. If not found, insert new user
    const [insertResult] = await db.query(
      `INSERT INTO ${dbTables.USER} (telegram_id, username, referred_by) VALUES (?, ?, ?)`,
      [telegramId, username, referredBy]
    );
    const userId = insertResult.insertId;

    const newUser = {
      id: userId,
      username,
      telegram_id: telegramId,
    };

    // 4. Generate token for new user
    const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    // 5. Handle referral reward if applicable
    if (referredBy && referredBy !== telegramId) {
      const [refUsers] = await db.query(
        `SELECT * FROM ${dbTables.USER} WHERE telegram_id = ?`,
        [referredBy]
      );
      if (refUsers.length > 0) {
        const referrer = refUsers[0];
        await db.query(
          `INSERT INTO ${dbTables.REWARDS} (user_id, points, reason)
           VALUES (?, ?, 'referral')`,
          [referrer.id, REFERRAL_POINTS]
        );
      }
    }

    return res
      .status(201)
      .json({
        status: "success",
        message: "User registered successfully",
        token,
        user: newUser,
      });
  } catch (error) {
    console.error("Telegram login error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

const generateReferralCode = () => crypto.randomBytes(4).toString("hex");

exports.register = async (req, res) => {
  const { username, phone, email, password, referralCode } = req.body;

  try {
    process.env.DEBUG === "Y" &&
      console.log(
        `AuthController > register: ${username}, ${phone}, ${password}, ${referralCode}`,
        req.body
      );

    // ✅ Check for duplicate phone
    const [existingUsers] = await db.query(
      `SELECT id FROM ${dbTables.USER} WHERE phonenumber = ?`,
      [phone]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is already registered.",
      });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);
    const userReferralCode = generateReferralCode();

    // ✅ Check referral and get referrer ID
    let referredBy = null;
    let referrerId = null;

    if (referralCode) {
      const [referrer] = await db.query(
        `SELECT id FROM ${dbTables.USER} WHERE referral_code = ?`,
        [referralCode]
      );
      if (referrer.length > 0) {
        referredBy = referrer[0].id;
        referrerId = referrer[0].id;
      }
    }

    // ✅ Insert new user
    const [result] = await db.query(
      `INSERT INTO ${dbTables.USER} (username, phonenumber, email, password, referral_code, referred_by) VALUES (?, ?, ?, ?, ?)`,
      [username, phone, email, hashed, userReferralCode, referredBy]
    );

    // ✅ If referred, add reward points to referrer
    if (referrerId) {
      await db.query(
        `INSERT INTO ${dbTables.REWARDS} (user_id, points, reason) VALUES (?, ?, ?)`,
        [referrerId, REFERRAL_POINTS, "referral_bonus"]
      );
    }

    res.json({ status: "success", message: "Registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    process.env.DEBUG === "Y" &&
      console.log(`AuthController > login: ${phone}, ${password}`, req.body);

    const [rows] = await db.query(
      `SELECT * FROM ${dbTables.USER} WHERE phonenumber = ?`,
      [phone]
    );
    if (!rows.length)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials!" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials!!" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "356d",
    });
    res.json({
      status: "success",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayname: user.displayname,
        referralCode: user.referral_code,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins from now

  try {
    const [user] = await db.query(
      `SELECT * FROM ${dbTables.USER} WHERE email = ?`,
      [email]
    );
    if (user.length === 0)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });

    await db.query(
      `UPDATE ${dbTables.USER} SET reset_token = ?, reset_token_expiry = ? WHERE email = ?`,
      [token, expiry, email]
    );

    const resetLink = `${process.env.SITE_BASE_URL}reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({
      status: "success",
      message: "Password reset link sent to email",
    });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const [users] = await db.query(
      `SELECT * FROM ${dbTables.USER} WHERE reset_token = ? AND reset_token_expiry > NOW()`,
      [token]
    );

    if (users.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `UPDATE ${dbTables.USER} SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?`,
      [hashedPassword, users[0].id]
    );

    res.json({
      status: "success",
      message: "Password has been reset successfully",
    });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
