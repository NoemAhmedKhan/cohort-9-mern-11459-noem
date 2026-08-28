const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/env");
const logger = require("../utils/logger");

const generateJWT = async (user) => {
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email
    }

    return jwt.sign(payload, JWT_SECRET, {expiresIn: '12h'});
}

const verifyJWT = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }catch (error) {
        logger.warn(`JWT verification failed: ${error.message}`);
    }
}

module.exports = { generateJWT, verifyJWT };