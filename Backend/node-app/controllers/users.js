const User = require("../models/users");
const { generateJWT } = require("../security/jwt");
const bcrypt = require("bcrypt");
const Note = require("../models/notes");
const { NODE_ENV } = require("../config/env");

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

        return res.status(201).json({message: "Account Created!"});
    }catch (error) {
        res.status(400).json({message: "Signup Failed!"});
    }
};

const handleLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user) return res.status(400).json({message: "Invalid Credentials!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid Credentials!"});

        const jwtToken = await generateJWT(user);
            res.cookie('token', jwtToken, {
                maxAge: 43200000, // 12 HOUR EXPIRATION TIME
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: 'lax'
            });

        return res.status(200).json({message: "Login Successful!"});
    }catch (error) {
        res.status(401).json({message: "Login Failed!"});
    }
}

const handleLogout = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200).json({message: "Logout Successful!"});
    }catch (error) {
        res.status(401).json({message: error});
    }
}

const handleDashboard = async (req, res) => {
    try{
        const Notes = await Note.find({user: req.user.id});
        return res.status(200).json(Notes);
    }catch (error) {
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

        return res.status(200).json(updatedUser);
    }catch (error) {
        res.status(401).json({message: "Access Denied!"});
    }
}

const handleChangePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return res.status(400).json({message: "Wrong password! please enter a valid password."});

        user.password = newPassword;
        await user.save();
        return res.status(200).json({message: "Password changed successfully!"});
    }catch (error) {
        res.status(401).json({message: "Access Denied!"});
    }
}


module.exports = { handleSignup, handleLogin, handleLogout, handleDashboard, handleProfile, handleEditProfile, handleChangePassword, handleChangePassword }