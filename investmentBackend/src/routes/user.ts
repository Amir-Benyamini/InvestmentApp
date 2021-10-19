import express from 'express';
import { read } from '../actions/user'
import { requireLogin } from '../actions/auth'

const userRouter = express.Router()

userRouter.get('/:id', requireLogin, read);



export default userRouter