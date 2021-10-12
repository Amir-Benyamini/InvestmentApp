import { check } from 'express-validator'

export const userSighnupValidator = [
	check('name').notEmpty().withMessage('name is required!'),
	check('email').isEmail().withMessage('must be a valid email address!'),
	check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters!')
]