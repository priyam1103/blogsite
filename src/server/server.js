require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 3004 || process.env.PORT; 
const { connectDb } = require("./service/db");
app.use(cors());
connectDb();
require("./service/routes")(app);


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})