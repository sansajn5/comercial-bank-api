const express = require('express')
const bodyParser = require('body-parser')

const defaultPort = 8000
const app = express()

//controlers


// Setup body-parser middleware
app.use(bodyParser.json({type: 'application/json'}))

// Set CORS security headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Will change to actual Internal network IP
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  next()
})


//routes


app.listen(process.env.PORT || defaultPort, () => {
    console.log(`Rest API is up on port ${defaultPort}.`)
})
  


module.exports = app 