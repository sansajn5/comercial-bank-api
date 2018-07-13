const currencyService = require('../services/currencyService')
const modelFactory = require('../utils/modelFactory')

const createCurrency = (req, res, next) => {
    const currency = modelFactory.createRawCurrency(req.body)
    const bankId = req.body.bankId
    currencyService.save(bankId, currency)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const currencys = (req, res, next) => {
    currencyService.findAll()
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const currency = (req, res, next) => {
    const id = req.params.id
    currencyService.findOneById(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const editCurrency = (req, res, next) => {
    const id = req.params.id
    currencyService.edit(id, req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const deleteCurrency = (req, res, next) => {
    const id = req.params.id
    const bankId = req.params.bankId
    currencyService.deleteOne(bankId, id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const findCurrency = (req, res, next) => {
    currencyService.findByAny(req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    createCurrency,
    currencys,
    currency,
    editCurrency,
    deleteCurrency,
    findCurrency
}