const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("./config/dotenv");
const client = require("./config/database");



client.connect((err) => { //Connected Database

    if (err) {

        console.log(err);

    }

    else {

        console.log("Data logging initiated!");
    }

});

app.use(cors);
const user = require("./routes/user")
app.use("/user", user);


app.use(express.json());

app.post("/user/register")
