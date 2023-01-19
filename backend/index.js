const mysql = require("mysql2/promise");
const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const PORT = 5_000;

const MYSQL_CONFIG = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
};

app.listen(PORT, () => {
    console.log(`Backend server is running on Port: ${PORT}`);
});
