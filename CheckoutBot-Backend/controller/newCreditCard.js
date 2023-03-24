const bcrypt = require("bcrypt");
const client = require("../config/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = crypto.randomBytes(16);

const encrypt = (data) => {

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        data: encrypted
    };
};



exports.newCreditCard = async (req, res) => {
    const { user_id, cardUsername, cardFullName, cardNumber, expiry, cvs } = req.body;
    try {
        await client.query(`
        CREATE TABLE IF NOT EXISTS credit_cards (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            card_username TEXT,
            card_fullname TEXT,
            card_number TEXT UNIQUE,
            card_expiry TEXT,
            card_cvv TEXT
        );`
        );
        const hashedCardFullName = encrypt(cardFullName);
        const hashedCardExpiry = encrypt(expiry);
        const hashedCardNumber = encrypt(cardNumber);

        const hashedCardCVS = encrypt(cvs);

        const existingCard = await client.query(`SELECT * FROM credit_cards WHERE card_number = $1`, [hashedCardNumber]);

        if (existingCard.rowCount > 0) {
            return res.status(400).json({ error: "A card with this number already exists." });
        }

        else {
            await client.query(`INSERT INTO credit_cards (user_id,card_username, card_fullname, card_number, card_expiry, card_cvv)
        VALUES ($1, $2, $3, $4, $5,$6)`, [user_id, cardUsername, hashedCardFullName, hashedCardNumber, hashedCardExpiry, hashedCardCVS]);

            res.status(201).json({ message: 'Credit card added successfully' })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while adding Card!"
        });
    }
}
