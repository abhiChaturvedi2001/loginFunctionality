const express = require('express');
const app = express();
const db = require("./db");
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require("./Routes/userRoutes")

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/auth", authRoutes);
app.listen(process.env.PORT, () => {
    console.log(`port listen on ${process.env.PORT}`);
})