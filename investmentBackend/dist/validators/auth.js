"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSigninValidator = exports.userSignupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.userSignupValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('name is required!'),
    (0, express_validator_1.check)('email').isEmail().withMessage('must be a valid email address!'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters!')
];
exports.userSigninValidator = [
    (0, express_validator_1.check)('email').isEmail().withMessage('must be a valid email address!'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters!')
];
