const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/env");

const generateJWT = async (user) => {
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email
    }

    return jwt.sign(payload, JWT_SECRET, {expiresIn: '12h'});
}

const verifyJWT = async (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateJWT, verifyJWT };