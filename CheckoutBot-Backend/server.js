const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const client = require("./config/database");

app.use(cors()); // corrected - cors needs to be invoked as a function
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Engine Started, Ready to take off!");
});

app.use("/user", require("./routes/user"));

client.connect((err) => { //Connected Database
    if (err) {
        console.log(err);
    } else {
        console.log("Data logging initiated!");
    }
});

app.listen(port, () => {
    console.log(`Here we go, Engines started at ${port}.`);
});

