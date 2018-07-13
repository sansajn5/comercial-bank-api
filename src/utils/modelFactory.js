const Employee = require('../models/Employee')
const Bank = require('../models/Bank')
const Client = require('../models/Client')
const Currency = require('../models/Currency')
const BankAccount = require('../models/BankAccount')
const generator = require('node-uuid-generator');
const ExchangeList = require('../models/ExchangeList')
const ExchangeRate = require('../models/ExchangeRate')

const createRawEmployee = (rawEmployee) => {
    return employee = new Employee({
        username: rawEmployee.username,
        password: rawEmployee.password,
        firstName: rawEmployee.firstName,
        lastName: rawEmployee.lastName,
        email: rawEmployee.email
    })
}

const createRawBank = (rawBank) => {
    return bank = new Bank({
        name: rawBank.name,
        code: rawBank.code,
        pib: rawBank.pib,
        email: rawBank.email,
        address: rawBank.address,
        phone: rawBank.phone,
        fax: rawBank.fax
    })
}

const createRawClient = (rawClient) => {
    let client = new Client({
        name: rawClient.name,
        address: rawClient.address,
        phone: rawClient.phone,
        jmbg: rawClient.jmbg,
        email: rawClient.email,
        legal: rawClient.legal
    })
    if(rawClient.legal) {
        client.pib = rawClient.pib
        client.taxAuthority = rawClient.taxAuthority
        client,deliveryAdress = rawClient.deliveryAdress
        client.responsiblePerson = rawClient.responsiblePerson
    }
    return client
}

const createRawCurrency = (rawCurrency) => {
    return new Currency({
        code: rawCurrency.code,
        name: rawCurrency.name
    })
}

const createRawBankAccount = (rawBankAccount) => {
    return new BankAccount({
        number: generator.generate(),
        valid: rawBankAccount.valid,
        mailReporting: rawBankAccount.mailReporting
    })
}

const createRawExchangeList = (bank, date) => {
    let rawExchangeList = new ExchangeList({
        bank: bank
    })
    if(date) 
        rawExchangeList.createdDate = new Date(date)
    return rawExchangeList
}

const createRawExchangeRate = (rawExchangeRate) => {
    return new ExchangeRate({
        fromCurrency: rawExchangeRate.fromCurrency,
        toCurrency: rawExchangeRate.toCurrency,
        value: rawExchangeRate.value
    })
}

module.exports = {
    createRawEmployee,
    createRawBank,
    createRawClient,
    createRawCurrency,
    createRawBankAccount,
    createRawExchangeList,
    createRawExchangeRate
}

