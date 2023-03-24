
const client = require("../config/database");
require("dotenv").config();

exports.getProxyList = async (req, res) => {
    const { user_id } = req.params;
    try {
        const { rows } = await client.query(`
            SELECT * FROM proxies
            WHERE user_id = $1`, [user_id]);

        res.status(200).json({
            message: "Successfully retrieved proxy list.",
            proxies: rows

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while fetching proxy list!"
        });
    }
}
