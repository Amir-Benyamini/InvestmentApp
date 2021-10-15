import express from 'express';
const authRouter = express.Router()
import { accountActivation, signup, login } from '../actions/auth'
import { runValidation } from './../validators/index';
import { userSignupValidator, userSigninValidator } from './../validators/auth';

authRouter.post('/signup', userSignupValidator, runValidation, signup);

authRouter.post('/account-activation', accountActivation);

authRouter.post('/login', userSigninValidator, runValidation, login);

export default authRouter