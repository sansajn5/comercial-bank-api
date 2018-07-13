const modelFactory = require('../utils/modelFactory')
const bankAccountService = require('../services/bankAccountService')

const openAccount = (req, res, next) => {
    const bankId = req.params.id
    const bankAccount = modelFactory.createRawBankAccount(req.body)
    bankAccountService.save(bankAccount, req.body.ownerId, req.body.currencyId, bankId)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const bankAccountsForBank = (req, res, next) => {
    const bankId = req.params.id
    bankAccountService.findAllFor({'Bank': bankId})
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const bankAccountsForClient = (req, res, next) => {
    const ownerId = req.params.id
    bankAccountService.findAllFor({'owner': ownerId})
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const bank = (req, res, next) => {
    const bankAccountId = req.params.id
    bankAccountService.findOne(bankAccountId)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const deleteBank = (req, res, next) => {
    const bankAccountId = req.params.id
    bankAccountService.deleteOne(bankAccountId)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const editBankAccount = (req, res, next) => {
    const id = req.params.id
    bankAccountService.edit(req.body, id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    openAccount,
    bankAccountsForBank,
    bankAccountsForClient,
    bank,
    deleteBank,
    editBankAccount
}