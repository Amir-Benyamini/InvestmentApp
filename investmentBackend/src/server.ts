// const express = require('express')
// const cors = require('cors')
// const api = require('./api')
// const connectDB = require('./connection')
import express from 'express';
import cors from 'cors';
import api from './routes/api';
import connectDB from './db/connection';

const app = express()

connectDB();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

 
app.use('/', api)

const port = 4000
app.listen(port, () => console.log(`server is up and running at port ${port}`))