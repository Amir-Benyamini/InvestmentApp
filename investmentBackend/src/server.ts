// const express = require('express')
// const cors = require('cors')
// const api = require('./api')
// const connectDB = require('./connection')
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import api from './routes/api';
import authRoutes from './routes/auth';
import connectDB from './db/connection';
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
connectDB();

//middlewares
// app.use(cors()) allow all origins
if(process.env.NODE_ENV === 'development'){
	app.use(cors({origin: `http://localhost:300`}))
};
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))


//routes
app.use('/', api)
app.use('/auth', authRoutes)

const port = process.env.PORT
app.listen(port, () => console.log(`server is up and running at port ${port}`))

