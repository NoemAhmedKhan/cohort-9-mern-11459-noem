const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/notetakerdb';

async function connectDB() {
    try {
        await mongoose.connect(dbURI);
        console.log('Mongoose Successfully Connected To MongoDB');
    } catch (error) {
        console.error('Mongoose Connection Error:', error);
    }
}

module.exports = connectDB;
