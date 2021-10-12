import express from 'express';
const authRouter = express.Router()
import { signup } from '../actions/auth'
import { runValidation } from './../validators/index';
import { userSighnupValidator } from './../validators/auth';

authRouter.post('/signup', userSighnupValidator, runValidation, signup);

export default authRouter