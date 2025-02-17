require ("dotenv").config()

const mongoose = require("mongoose");

const connectDb =  mongoose.connect(process.env.MONGO_URI);

module.exports = connectDb;