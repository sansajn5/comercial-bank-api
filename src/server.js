const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const defaultPort = 8000
const app = express()

// Database
const mongoose = require('mongoose')
mongoose.connect("mongodb://dev:dev123@db:27017/comercial-bank", { useNewUrlParser: true })

// Controlers
const employeeController = require('./controllers/employeeController')

// Setup body-parser middleware
app.use(bodyParser.json({type: 'application/json'}))

// Set CORS security headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Will change to actual Internal network IP
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next()
})

// Routes
app.route('/api/employee').post(employeeController.register)

app.listen(process.env.PORT || defaultPort, () => {
    // console.log(process.env.DB_CONNECTION_STRING + process.env.SALT_LENGTH)
    console.log(`Rest API is up on port ${defaultPort}.`)
})

module.exports = app 