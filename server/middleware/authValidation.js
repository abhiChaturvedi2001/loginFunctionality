const joi = require("joi");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
require('dotenv').config();

exports.authValidationRegister = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(15).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message
        });
    }

    next();
};

exports.authValidationLogin = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).max(15).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message
        });
    }

    next();
};


exports.jwtVerifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ msg: "Unauthorized access || token not found" });
    }

    const token = authorization.split(" ")[1]; // Correct index for token
    if (!token) {
        return res.status(401).json({ msg: "Token not found" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWTSECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ msg: "Invalid token" });
    }
};


