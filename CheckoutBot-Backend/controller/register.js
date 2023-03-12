const bcrypt = require("bcrypt");
const client = require("../config/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
exports.register = async (req, res) => {
    const { name, email, phonenumber, password } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "Email already there, No need to register again.",
            });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const user = {
                name,
                email,
                phonenumber,
                password: hash,
            };
            try {
                await client.query(`INSERT INTO "users" (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`, [user.name, user.email, user.phonenumber, user.password]);
                const token = jwt.sign(
                    {
                        email: user.email
                    },
                    process.env.SECRET_KEY
                );
                res.status(200).json({
                    message: 'User added to database, not verified',
                    token
                });
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Database error"
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while registering user!"
        });
    }
}
