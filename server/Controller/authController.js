const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();

exports.signUpController = async (req, res) => {

    try {
        const { name, phone, email, password } = req.body
        const userExist = await User.findOne({ email });

        // if user exist then send this 
        if (userExist) {
            return res.status(409).json({
                success: false,
                message: "user already exist"
            })
        }

        // if not then send create new user
        const newUser = await User.create({ name, phone, email, password });
        // before saving user please hash the password of the user
        const genSalt = await bcrypt.genSalt(12);
        newUser.password = await bcrypt.hash(newUser.password, genSalt);
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User Registers Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid Request"
        })
    }
}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const errorMsg = "Auth email and password is wrong or else";

        // if user is not found
        if (!user) {
            return res.status(404).json({
                message: errorMsg,
                success: false
            });
        }

        // now checking the password is correct while login
        const isPassEqual = await bcrypt.compare(password, user.password);
        // if it is not valid
        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // generating JWT token for the user
        const token = jwt.sign({ email: email, _id: user._id }, process.env.JWTSECRET, {
            expiresIn: '24h'
        });

        return res.status(200).json({
            message: "login successfully",
            token,
            id: user._id,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


exports.gettingUser = async (req, res) => {
    try {
        const userData = req.user;
        const email = userData.email;
        const user = await User.findOne({ email })
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
}

