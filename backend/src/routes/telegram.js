const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/webhook', async (req, res) => {
    const msg = req.body.message;
    if (!msg || !msg.from) return res.sendStatus(200);

    const telegramId = msg.from.id;
    const displayname = msg.from.first_name || '';
    const lastName = msg.from.last_name || '';
    const name = `${displayname}_${lastName}`.trim();
    const text = msg.text;

    if (text.startsWith('/start')) {
        const parts = text.split(' ');
        const referralCode = parts[1] || null;

        try {
            // Check if user already exists
            const [existing] = await db.query("SELECT * FROM users WHERE telegram_id = ?", [telegramId]);
            if (existing.length > 0) return res.sendStatus(200); // already registered

            const userReferralCode = generateReferralCode();

            let referredBy = null;
            if (referralCode) {
                const [referrer] = await db.query("SELECT * FROM users WHERE referral_code = ?", [referralCode]);
                if (referrer.length > 0) referredBy = referralCode;
            }

            // Insert user
            const [result] = await db.query(
                "INSERT INTO users (telegram_id, username, displayname, referral_code, referred_by) VALUES (?, ?, ?, ?)",
                [telegramId, name,  displayname, userReferralCode, referredBy]
            );

            // Reward referrer
            if (referredBy) {
                const [refUser] = await db.query("SELECT id FROM users WHERE referral_code = ?", [referredBy]);
                await db.query(
                    "INSERT INTO rewards (user_id, reason, points) VALUES (?, 'Referral', 10.00)",
                    [refUser[0].id]
                );
            }

            // Reply with welcome message
            await sendTelegramMessage(telegramId, `Welcome ${name}! Your referral code is ${userReferralCode}`);

        } catch (err) {
            console.error(err);
        }
    }

    res.sendStatus(200);
});

function generateReferralCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function sendTelegramMessage(chatId, text) {
    const axios = require('axios');
    const TOKEN = 'YOUR_BOT_TOKEN';
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: text,
    });
}

module.exports = router;
