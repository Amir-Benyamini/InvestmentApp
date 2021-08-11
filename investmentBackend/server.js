const express = require('express')
const app = express()
const api = require('./routs/api')
const connectDB = require('./db/connection')
const cors = require('cors')

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
 
app.use('/', api)

const port = 4000
app.listen(port, () => console.log(`server is up and running at port ${port}`))