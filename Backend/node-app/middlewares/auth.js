const { verifyJWT } = require("../security/jwt");

const validateForm = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(typeof email !== "string" || typeof password !== "string") return res.status(400).json({message: "Invalid Credentials!"});

    const hasValidEmail = email.toLowerCase().endsWith("@gmail.com");
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasLength = (password.length >= 8) && (password.length <= 16);

    if(hasValidEmail && hasUppercase && hasNumber && hasSpecial && hasLength) return next();
    return res.status(400).json({message: "Invalid Credentials!"});
};

module.exports = { validateForm };