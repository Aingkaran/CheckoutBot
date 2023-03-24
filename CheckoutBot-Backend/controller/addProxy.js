const client = require("../config/database");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

exports.addProxy = async (req, res) => {
    const { user_id, proxies } = req.body;
    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS proxies (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          uuid TEXT UNIQUE,
          address TEXT,
          port TEXT,
          username TEXT,
          password TEXT
      );`
        );

        for (const proxy of proxies) {
            const { address, port, username, password } = proxy;
            const uuid = uuidv4();

            const existingProxy = await client.query(`SELECT * FROM proxies WHERE uuid = $1`, [uuid]);

            if (existingProxy.rowCount > 0) {
                return res.status(400).json({ error: "A proxy with this UUID already exists." });
            } else {
                await client.query(`INSERT INTO proxies (user_id, uuid, address, port, username, password)
          VALUES ($1, $2, $3, $4, $5, $6)`, [user_id, uuid, address, port, username, password]);
            }
        }

        res.status(201).json({ message: "Proxies added successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while adding proxies!"
        });
    }
}
