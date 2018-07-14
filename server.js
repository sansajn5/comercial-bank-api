const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const defaultPort = 8000
const app = express()

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })

// Controlers
const employeeController = require('./src/controllers/employeeController')
const bankController = require('./src/controllers/bankController')
const clientController = require('./src/controllers/clientController')
const currencyController = require('./src/controllers/currencyController')
const bankAccountController = require('./src/controllers/bankAccountController')
const inputController = require('./src/controllers/inputController')

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
app.route('/api/employees').post(employeeController.register)
// Auth
app.route('/api/auth').post(employeeController.login)
app.route('/api/employees').get(employeeController.employess)
// Bank
app.route('/api/banks').get(bankController.banks)
app.route('/api/banks').post(bankController.createBank)
app.route('/api/banks/:id').get(bankController.getBank)
app.route('/api/banks/:id/clients').get(bankController.getClients)
app.route('/api/banks/:id/currencys').get(bankController.getCurrencys)
app.route('/api/banks/:id').post(bankController.addEmployee)
app.route('/api/banks/:id/accounts').post(bankAccountController.openAccount)
app.route('/api/banks/:id/accounts').get(bankAccountController.bankAccountsForBank)
app.route('/api/banks/:id/exchange-lists').post(bankController.openExchangeList)
app.route('/api/banks/:id/exchange-lists').get(bankController.getAllExchangeListForBank)

// Client
app.route('/api/clients').get(clientController.clients)
app.route('/api/clients').post(clientController.createClient)
app.route('/api/clients/:id').put(clientController.editClient)
app.route('/api/clients/:id').delete(clientController.deleteClient)
app.route('/api/clients/criteria').post(clientController.findClient)
app.route('/api/clients/:id').get(clientController.client)
app.route('/api/clients/:id/accounts').get(bankAccountController.bankAccountsForClient)

// Currency
app.route('/api/currencys').get(currencyController.currencys)
app.route('/api/currencys').post(currencyController.createCurrency)
app.route('/api/currencys/:id').put(currencyController.editCurrency)
app.route('/api/currencys/:bankId/:id').delete(currencyController.deleteCurrency)
app.route('/api/currencys/criteria').post(currencyController.findCurrency)
app.route('/api/currencys/:id').get(currencyController.currency)

// BankAccount
app.route('/api/bank-accounts/:id').get(bankAccountController.bank)
app.route('/api/bank-accounts/:id').delete(bankAccountController.deleteBank)
app.route('/api/bank-accounts/:id').put(bankAccountController.editBankAccount)
app.route('/api/bank-accounts-close/:id').get(bankAccountController.closeAccount)

// Exchange
app.route('/api/exchange-lists/:id').delete(bankController.deleteExchnageList)
app.route('/api/exchange-lists/:id').post(bankController.addRateToList)
app.route('/api/exchange-lists-rate/:id').delete(bankController.deleteRateFromList)
app.route('/api/exchange-lists-rate/:id').get(bankController.getRate)
app.route('/api/exchange-lists-rate/:id').put(bankController.editExchangeRate)
app.route('/api/exchange-lists/:id').get(bankController.getAllRatesFromList)

// Input & Output
app.route('/api/parse').post(inputController.readFile)
app.route('/api/transactions/:id').post(inputController.createTransaction)
app.route('/api/transactions-find/:id').post(inputController.findBetween)
app.route('/api/transactions-find/:id').get(inputController.findAll)
app.route('/api/transactions-find-xml/:id').post(inputController.xml)

app.listen(process.env.PORT || defaultPort, () => {
    console.log(`Rest API is up on port ${defaultPort}.`)
})

module.exports = app 