const { verifyJWT } = require("../security/jwt");
const logger = require("../utils/logger");

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

const authenticateUser = async (req, res, next) => {
        const token = req.cookies.token;
        if(!token) {
            logger.warn(`Blocked request with no auth token: ${req.method} ${req.originalUrl}`);
            return res.status(401).json({message: "Unauthorized!"});
        }

        const payload = await verifyJWT(token);
        if(!payload) {
            logger.warn(`Blocked request with invalid/expired token: ${req.method} ${req.originalUrl}`);
            return res.status(401).json({message: "Unauthorized!"});
        }

        req.user = payload;
        return next();

        logger.error(`authenticateUser middleware error: ${error.message}`);
        return res.status(401).json({message: "Access Denied!"});
};

const validateNote = (req, res, next) => {
        const { title, content } = req.body;
        // TITLE VALIDATION
        if (typeof title !== "string") {
            return res.status(400).json({message: "Title is not valid!"});
        }

        if (!title.trim()) {
            return res.status(400).json({message: "Title is required!"});
        }

        if (title.trim().length > 100) {
            return res.status(400).json({message: "Title should be less than 100 characters!"});
        }

        // CONTENT VALIDATION
        if (
            !content ||
            typeof content !== "object" ||
            Array.isArray(content)
        ) {
            return res.status(400).json({message: "Invalid content format!"});
        }

        if (content.type !== "doc") {
            return res.status(400).json({message: "Invalid Tiptap document!"});
        }

        if (
            !Array.isArray(content.content) ||
            content.content.length === 0
        ) {
            return res.status(400).json({message: "Content should not be empty!"});
        }

        req.title = title;
        req.content = content;
        return next();

        res.status(400).json({message: "Error occurred!"});
};

module.exports = { authenticateUser, validateForm, validateNote };