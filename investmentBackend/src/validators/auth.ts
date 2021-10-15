import { check } from 'express-validator'

export const userSignupValidator = [
	check('name').notEmpty().withMessage('name is required!'),
	check('email').isEmail().withMessage('must be a valid email address!'),
	check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters!')
]

export const userSigninValidator = [
	check('email').isEmail().withMessage('must be a valid email address!'),
	check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters!')
]