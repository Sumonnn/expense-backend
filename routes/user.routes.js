const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register',
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    body('fullName.lastName').optional().isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.registerUser
);
router.post('/login',
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.loginUser
);


module.exports = router;