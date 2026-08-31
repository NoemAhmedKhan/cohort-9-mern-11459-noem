const User = require("../models/users");
const { generateJWT } = require("../security/jwt");
const bcrypt = require("bcrypt");
const Note = require("../models/notes");
const { NODE_ENV } = require("../config/env");
const logger = require("../utils/logger");

const handleSignup = async (req, res) => {
    try{
        const { fullName, email, password } = req.body;
        const user = await User.findOne({email: email});
        if(user) return res.status(400).json({message: "This email is already registered!"});

        await User.create(
            {
                fullName,
                email,
                password
            });

        logger.info(`New user registered: ${email}`);
        return res.status(201).json({message: "Account Created!"});
    }catch (error) {
        logger.error(`Signup failed: ${error.message}`);
        res.status(400).json({message: "Signup Failed!"});
    }
};

const handleLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            logger.warn(`Login attempt for unknown email: ${email}`);
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            logger.warn(`Failed login attempt (wrong password) for: ${email}`);
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        const jwtToken = await generateJWT(user);
        res.cookie('token', jwtToken, {
            maxAge: 43200000, // 12 HOUR EXPIRATION TIME
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: 'lax'
        });

        logger.info(`User logged in: ${email}`);
        return res.status(200).json({message: "Login Successful!"});
    }catch (error) {
        logger.error(`Login error: ${error.message}`);
        res.status(401).json({message: "Login Failed!"});
    }
}

const handleLogout = async (req, res) => {
    try{
        res.clearCookie("token");
        logger.info(`User logged out: ${req.user?.id}`);
        return res.status(200).json({message: "Logout Successful!"});
    }catch (error) {
        logger.error(`Logout error: ${error.message}`);
        res.status(401).json({message: error});
    }
}

const handleDashboard = async (req, res) => {
    try{
        const Notes = await Note.find({user: req.user.id});
        return res.status(200).json(Notes);
    }catch (error) {
        logger.error(`Dashboard fetch failed for user ${req.user?.id}: ${error.message}`);
        res.status(401).json({message: "Access Denied!"});
    }
}

const handleProfile = async (req, res) => {
    try{
        const profile = {
            fullName: req.user.fullName,
            email: req.user.email
        };
        return res.status(200).json(profile);
    }catch (error) {
        logger.error(`Profile fetch failed: ${error.message}`);
        res.status(401).json({message: "Access Denied!"});
    }
}

const handleEditProfile = async (req, res) => {
    try{
        const { fullName, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {fullName, email}, {returnDocument: 'after'});
        const jwtToken = await generateJWT(updatedUser);
        res.cookie('token', jwtToken, {
            maxAge: 43200000, // 12 HOUR EXPIRATION TIME
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: 'lax'
        });

        logger.info(`Profile updated for user ${req.user.id}`);
        return res.status(200).json({
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            message: "Profile updated!"
        });
    }catch (error) {
        logger.error(`Edit profile failed for user ${req.user?.id}: ${error.message}`);
        res.status(401).json({message: "Access Denied!"});
    }
}

const handleChangePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");
        if (!user) {
            logger.warn(`Failed to find unknown user: ${req.user.id}`);
            return res.status(401).json({message: "Access Denied!"});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            logger.warn(`Failed password change attempt for user ${req.user.id}`);
            return res.status(400).json({message: "Wrong password! please enter a valid password."});
        }

        user.password = newPassword;
        await user.save();
        logger.info(`Password changed for user ${req.user.id}`);
        return res.status(200).json({message: "Password changed successfully!"});
    }catch (error) {
        logger.error(`Change password failed for user ${req.user?.id}: ${error.message}`);
        res.status(401).json({message: "Access Denied!"});
    }
}

module.exports = { handleSignup, handleLogin, handleLogout, handleDashboard, handleProfile, handleEditProfile, handleChangePassword };