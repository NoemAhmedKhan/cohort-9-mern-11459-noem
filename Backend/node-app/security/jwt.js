const jwt = require('jsonwebtoken');
const secretKey = "NT-1001$n.ak@JS";

const generateJWT = async (user) => {
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email
    }

    return jwt.sign(payload, secretKey, {expiresIn: '12h'});
}

const verifyJWT = async (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = { generateJWT, verifyJWT };