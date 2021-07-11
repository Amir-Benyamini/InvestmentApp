const express = require('express')
const app = express()
const api = require('./routs/api')
const connectDB = require('./db/connection')


connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
 
app.use('/', api)

const port = 4000
app.listen(port, () => console.log(`server is up and running at port ${port}`))