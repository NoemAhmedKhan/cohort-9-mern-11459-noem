const mongoose = require('mongoose');
const { MONGODB_URI } = require("./config/env");
const logger = require("./utils/logger");

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info('Mongoose Successfully Connected To MongoDB');
    } catch (error) {
        logger.error(`Mongoose Connection Error: ${error.message}`);
        throw error;
    }
}

module.exports = connectDB;
