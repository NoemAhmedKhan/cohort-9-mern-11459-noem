const mongoose = require('mongoose');
const { MONGODB_URI } = require("./config/env");

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Mongoose Successfully Connected To MongoDB');
    } catch (error) {
        console.error('Mongoose Connection Error:', error);
    }
}

module.exports = connectDB;
