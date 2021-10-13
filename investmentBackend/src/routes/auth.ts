import express from 'express';
const authRouter = express.Router()
import { accountActivation, signup } from '../actions/auth'
import { runValidation } from './../validators/index';
import { userSighnupValidator } from './../validators/auth';

authRouter.post('/signup', userSighnupValidator, runValidation, signup);

authRouter.post('/account-activation', accountActivation);

export default authRouter