const bcrypt = require("bcrypt");
const client = require("../config/database");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const crypto = require('crypto');
require("dotenv").config();

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // this should be set to a long, random string in your .env file
const iv = crypto.randomBytes(16);

const decrypt = (hash) => {
    console.log("Hash:", hash);
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(hash.iv, 'hex'));
    let decrypted = decipher.update(hash.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

exports.getCreditCard = async (req, res) => {
    const { user_id } = req.params;
    try {
        const { rows } = await client.query('SELECT * FROM credit_cards WHERE user_id = $1', [user_id]);
        console.log(rows)
        if (rows.length === 0) {
            res.status(404).json({ message: 'No credit card found for this user' });
            return;
        }

        const creditCards = rows.map(card => {
            return {
                id: card.id,
                user_id: card.user_id,
                card_username: card.card_username,
                card_fullname: decrypt(JSON.parse(card.card_fullname)),
                card_number: decrypt(JSON.parse(card.card_number)),
                card_expiry: decrypt(JSON.parse(card.card_expiry)),
                card_cvv: decrypt(JSON.parse(card.card_cvv)),
            };
        });
        res.status(200).json({ creditCards });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while retrieving credit card data!"
        });
    }
};
