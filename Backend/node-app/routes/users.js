const express = require("express");
const userRouter = express.Router();
const { validateForm, authenticateUser } = require("../middlewares/auth")
const { handleSignup, handleLogin, handleLogout, handleDashboard, handleProfile, handleEditProfile, handleChangePassword } = require("../controllers/users");

userRouter.post("/signup", validateForm, handleSignup)
    .post("/login", validateForm, handleLogin)
    .get("/dashboard", authenticateUser, handleDashboard)
    .get("/profile", authenticateUser, handleProfile)
    .patch("/profile/edit", authenticateUser, handleEditProfile)
    .patch("/profile/changepassword", authenticateUser, handleChangePassword)
    .delete("/logout", authenticateUser, handleLogout);

module.exports = userRouter;