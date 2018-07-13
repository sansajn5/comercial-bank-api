const Bank = require('../models/Bank')
const Employee = require('../models/Employee')
const ExchangeList = require('../models/ExchangeList')
const ExchangeRate = require('../models/ExchangeRate')

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
    editRate
}