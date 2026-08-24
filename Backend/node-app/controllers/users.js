const User = require("../models/users");
const { generateJWT } = require("../security/jwt");
const bcrypt = require("bcrypt");
const { NODE_ENV } = require("../config/env");

const handleSignup = async (req, res) => {
    try{
        const { fullName, email, password } = req.body;
        const user = await User.findOne({email: email});
        if(user) return res.status(400).json({message: "User already exist with this email!"});

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

module.exports = { handleSignup, handleLogin }