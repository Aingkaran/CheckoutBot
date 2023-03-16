const bcrypt = require("bcrypt");

const client = require("../config/database");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        }
        else {
            bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) {
                    const token = jwt.sign(
                        {
                            email: email,
                            user_id: user[0].id,
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: "1h",
                        }
                    );
                    res.status(200).json({
                        message: "User signed in!",
                        token: token,
                        user_id: user[0].id

                    });
                }
                else {
                    if (result != true)
                        res.status(400).json({
                            error: "Enter correct password!",
                        });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
};