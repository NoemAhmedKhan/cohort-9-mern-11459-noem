require("dotenv").config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
}