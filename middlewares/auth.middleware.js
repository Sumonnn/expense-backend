const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');


exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.headers.authorization?.split(' ')[ 1 ];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();

    } catch (error) {
        // console.error(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}