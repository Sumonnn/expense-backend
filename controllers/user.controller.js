const userModel = require('../models/user.model.js');
const { validationResult } = require('express-validator');

// register User
module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userModel.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "User is registered Successfully",
            token,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be registered. please try again",
        })
    }
}

// Login User
module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const { email, password } = req.body;

        const User = await userModel.findOne({ email }).select('+password');

        if (!User) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = await User.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            User,
            token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Login Failure, please try again",
        })
    }
}

