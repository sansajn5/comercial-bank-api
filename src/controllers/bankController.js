const bankService = require('../services/bankService')
const modelFactory = require('../utils/modelFactory')
const responseHelper = require('../utils/responseHelper')
const clientService = require('../services/clientService')
const currencyService = require('../services/currencyService')

const getBank = (req, res, next) => {
    const id = req.params.id
    bankService.getById(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const createBank = (req, res, next) => {
    const bank = modelFactory.createRawBank({
        name: req.body.name,
        code: req.body.code,
        pib: req.body.pib,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        fax: req.body.fax
    })

    bankService.createBank(bank)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const banks = (req, res, next) => {
    bankService.getAll()
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const addEmployee = (req, res, next) => {
    const id = req.params.id
    if(!req.body.email)
        return responseHelper.malformedRequest('email', req, res, next)
    
    bankService.addEmployeeToBank(id, req.body.email)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const getClients = (req, res, next) => {
    const id = req.params.id
    clientService.findByAny({'bank': id})
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const getCurrencys = (req, res, next) => {
    const id = req.params.id
    currencyService.findByAny({'banks': id})
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const openExchangeList = (req, res, next) => {
    const id = req.params.id
    const date = req.body.createdDate
    const rawExchangeList = modelFactory.createRawExchangeList(id, date)
    bankService.addExchangeList(rawExchangeList)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))   
}

const getAllExchangeListForBank = (req, res, next) => {
    const id = req.params.id
    bankService.getAllExchangeLists(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const deleteExchnageList = (req, res, next) => {
    const id = req.params.id
    bankService.deleteExchnageList(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const addRateToList = (req, res, next) => {
    const id = req.params.id
    const rawExchangeRate = modelFactory.createRawExchangeRate(req.body)
    bankService.addRateToList(rawExchangeRate, id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const getAllRatesFromList = (req, res, next) => {
    const id = req.params.id
    bankService.getAllRatesForList(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const deleteRateFromList = (req, res, next) => {
    const id = req.params.id
    bankService.deleteRateFromList(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const getRate = (req, res, next) => {
    const id = req.params.id
    bankService.findRate(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const editExchangeRate = (req, res, next) => {
    const id = req.params.id
    bankService.editRate(id, req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    createBank,
    getBank,
    addEmployee,
    banks,
    getClients,
    getCurrencys,
    openExchangeList,
    getAllExchangeListForBank,
    deleteExchnageList,
    addRateToList,
    getAllRatesFromList,
    deleteRateFromList,
    getRate,
    editExchangeRate
}