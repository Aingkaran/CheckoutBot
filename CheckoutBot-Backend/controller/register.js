const bcrypt = require("bcrypt");
const client = require("../config/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

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
        const data = await client.query(`SELECT * FROM users WHERE email= $1 OR phonenumber= $2;`, [email, phonenumber]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "Email or phone number already exists. Please try again with different credentials.",
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

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Verify your email',
                    html: `<p>Thank you for registering with our website!</p>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({
                            error: "Error sending verification email"
                        });
                    } else {
                        console.log("Verification email sent:", info.response);
                        return res.status(200).json({
                            message: "User added to database, verification email sent",
                            token
                        });
                    }
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
