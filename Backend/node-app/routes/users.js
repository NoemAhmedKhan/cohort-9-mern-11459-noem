const express = require("express");
const userRouter = express.Router();
const { validateForm } = require("../middlewares/auth")
const { handleSignup, handleLogin } = require("../controllers/users");

userRouter.post("/signup", validateForm, handleSignup)
    .post("/login", validateForm, handleLogin);

module.exports = userRouter;