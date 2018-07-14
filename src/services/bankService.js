const Bank = require('../models/Bank')
const Employee = require('../models/Employee')
const ExchangeList = require('../models/ExchangeList')
const ExchangeRate = require('../models/ExchangeRate')
const BankAccount = require('../models/BankAccount')
const AccountState = require('../models/AccountState')
const Transaction = require('../models/Transaction')
const fs = require('fs')
const xml2js = require('xml2js');

const findBankById = async (id) => {
    try {
        let bank = await Bank.findById(id)
        return Promise.resolve(bank)
    } catch (err) {
        Promise.reject(err)
    }
}

const createBank = async (rawBank) => {
    return rawBank.save()
}

const addEmployeeToBank = async (bankId, email) => {
    try {
        const employee = await Employee.findOne({email: email})
        const bank = await Bank.findById(bankId)
        employee.bank = bank._id
        employee.save()
        bank.employees.push(employee)
        bank.save()
        return Promise.resolve(employee)
    } catch (err) {
        Promise.reject(err)
    }
}

const addClientToBank = async (bankId, client) => {
    try {
        const bank = await Bank.findById(bankId)
        bank.clients.push(client)
        client.bank = bank._id
        return Promise.resolve(client.save())
    } catch(err) {
        Promise.reject(err)
    }
}

const getAll = async () => {
    try {
        const banks = await Bank.find()
        return Promise.resolve(banks)
    } catch(err) {
        Promise.reject(err)
    }
}

const getById = async (id) => {
    try {
        const bank = await Bank.findById(id)
        return Promise.resolve(bank)
    } catch (err) {
        Promise.reject(err)
    }
}

const addExchangeList = async(rawExchangeList) => {
    return rawExchangeList.save()
}

const getAllExchangeLists = async(id) => {
    return ExchangeList.find({'bank': id}).exec();
}

const deleteExchnageList = async(id) => {
    let exchnageList = await ExchangeList.findById(id)
    return exchnageList.remove()
}

const getAllRatesForList = async(id) => {
    return ExchangeList.findOne({'_id': id}).populate('list').populate({path: 'list', populate: {path:'fromCurrency'} }).populate({path: 'list', populate: {path:'toCurrency'} }).exec()
}

const addRateToList = async(rawRate, id) => {
    let exchangeList = await ExchangeList.findById(id)
    exchangeList.list.push(rawRate)
    rawRate.save()
    return exchangeList.save()
}

const deleteRateFromList = async(id) => {
    let exchangeRate = ExchangeRate.findById(id)
    return exchangeRate.remove()
}

const findRate = async(id) => {
    return ExchangeRate.findById(id).populate('fromCurrency').populate('toCurrency').exec();
}

const editRate = async(id, rawRate) => {
    try {
        let rate = await ExchangeRate.findOneAndUpdate({'_id': id}, {'value': rawRate.value}).exec()
        if(!rate) {
            return Promise.reject(
                new Error('Currency with that properties does not exist')
            );
        }
        return ExchangeRate.findOne({'_id': rate._id}).exec()
    } catch (err) {
        Promise.reject(err)
    }
}

const nalogUplata = async(bankId, rawTransaction) => {
    let bankAccount = await BankAccount.findOne({'number': rawTransaction.accountCreditorXML})
    if(bankId == bankAccount.Bank && bankAccount.valid) {
        rawTransaction.save()
        const accountState = new AccountState({
            transaction: rawTransaction,
            createdDate: new Date('2018-07-01'),
            bankAccount: bankAccount
        })
        if(bankAccount.states.length == 0) {
            accountState.value = rawTransaction.sum
        } else {
            let latestState = await AccountState.find({'bankAccount': bankAccount._id}).sort({"createdDate": -1}).limit(1)
            accountState.value = latestState.value + rawTransaction.sum
        }
        accountState.save()
        bankAccount.states.push(accountState)
        Promise.resolve(bankAccount.save())
    } else {
        return Promise.reject(
            new Error('Not your bank or closed account')
        )
    }
}

const nalogIsplata = async(bankId, rawTransaction) => {
    let bankAccount = await BankAccount.findOne({'number': rawTransaction.debtorAccountXML})
    if(bankId == bankAccount.Bank && bankAccount.valid) {
        rawTransaction.save()
        const accountState = new AccountState({
            transaction: rawTransaction,
            createdDate: new Date('2018-07-01'),
            bankAccount: bankAccount
        })
        if(bankAccount.states.length == 0) {
            accountState.value = 0 - rawTransaction.sum
        } else {
            let latestState = await AccountState.findOne({'bankAccount': bankAccount._id}).sort({"createdDate": -1}).limit(1)
            accountState.value = latestState.value - rawTransaction.sum
        }
        accountState.save()
        bankAccount.states.push(accountState)
        Promise.resolve(bankAccount.save())
    } else {
        return Promise.reject(
            new Error('Not your bank or closed account')
        )
    }
}

const nalogPrenos = async() => {
    // let bankAccount = await BankAccount.findOne({'number': rawTransaction.debtorAccountXML})
    // if(bankId == bankAccount.Bank) {
    //     rawTransaction.save()
    //     if(rawTransaction.emergency)
    //     accountState.save()
    //     bankAccount.states.push(accountState)
    //     Promise.resolve(bankAccount.save())
    // } else {
    //     return Promise.reject(
    //         new Error('Not your bank')
    //     )
    // }
}

const closeAccount = async(id) => {
    try {
        let bankAccount = await BankAccount.findOneAndUpdate({'_id': id}, {'valid': false}).exec()
        if(!bankAccount) {
            return Promise.reject(
                new Error('Bank Account with that properties does not exist')
            );
        }
        return BankAccount.findOne({'_id': bankAccount._id}).exec()
    } catch (err) {
        Promise.reject(err)
    }
}

const nalozi = async(bankId) => {
    return await BankAccount.find({'Bank': bankId}).populate('owner').populate('states').populate({path: 'states', populate: {path:'transaction'} }).exec()
}

const stateForInterval = async(accountId, from , to) => {
    return await AccountState.find({'bankAccount': accountId , 'createdDate': {$gte: new Date(from), $lte: new Date(to)}}).populate('transaction').exec()
}

const makeXML = async(accountId, from , to) => {
    const data = await AccountState.find({'bankAccount': accountId , 'createdDate': {$gte: new Date(from), $lte: new Date(to)}}).populate('transaction').exec()
    const len = data.length
    let array = [];
    data.forEach(element => {
        const object = {
            type: element.transaction.type,
            sum: element.transaction.sum,
            code: element.transaction.code,
            emergency: element.transaction.emergency,
            purposeOfPayment: element.transaction.purposeOfPayment,
            accountCreditorXML: element.transaction.accountCreditorXML,
            debtorAccountXML: element.transaction.debtorAccountXML,
            paymentCurrencyXML: element.transaction.paymentCurrencyXML,
            createdDate: element.createdDate
        }
        array.push(object)
    })
 
    let builder = new xml2js.Builder();
    let xml = builder.buildObject({states: array, currenctState:data[len-1].value})
    return xml;
}

module.exports = {
    createBank,
    findBankById,
    addEmployeeToBank,
    getAll,
    getById,
    addClientToBank,
    addExchangeList,
    getAllExchangeLists,
    deleteExchnageList,
    getAllRatesForList,
    addRateToList,
    deleteRateFromList,
    findRate,
    editRate,
    nalogUplata,
    nalogIsplata,
    stateForInterval,
    nalozi,
    closeAccount,
    makeXML
}