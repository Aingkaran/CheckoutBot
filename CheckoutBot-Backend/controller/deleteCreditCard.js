
const client = require("../config/database");
require("dotenv").config();

exports.deleteCreditCard = async (req, res) => {
    const { user_id, uuids } = req.body;

    try {
        const tableExists = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'credit_cards'
            );
        `);

        if (!tableExists.rows[0].exists) {
            return res.status(400).json({ error: "Credit cards table does not exist." });
        }

        const deleteQuery = `
            DELETE FROM credit_cards
            WHERE user_id = $1 AND uuid = ANY($2::text[]);
        `;
        const deleteResult = await client.query(deleteQuery, [user_id, uuids]);

        if (deleteResult.rowCount > 0) {
            res.status(200).json({ message: `${deleteResult.rowCount} credit card(s) deleted successfully.` });
        } else {
            res.status(404).json({ message: "No credit cards found to delete." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while deleting credit card(s)!"
        });
    }
};

