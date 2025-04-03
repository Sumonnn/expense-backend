const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const userRoutes = require('./routes/user.routes.js');
const transactionRoutes = require('./routes/transaction.routes.js');

//dotenv
require('dotenv').config();
const port = process.env.PORT || 4000;

//DB Connected
require('./config/db.js').connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/transaction", transactionRoutes);

//listening
app.listen(port, (req, res) => {
    console.log(`Server is running at ${port}`);
})