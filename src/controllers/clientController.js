const clientService = require('../services/clientService')
const bankService = require('../services/bankService')
const modelFactory = require('../utils/modelFactory')

const createClient = (req, res, next) => {
    const client = modelFactory.createRawClient(req.body)
    const id = req.body.bank
    clientService.save(client)
    .then(data => {
        bankService.addClientToBank(id, client)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({error: err.message}))
    })
    .catch(err => res.status(500).json({error: err.message}))
}

const clients = (req, res, next) => {
    clientService.findAll()
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const client = (req, res, next) => {
    const id = req.params.id
    clientService.findOneById(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const editClient = (req, res, next) => {
    const id = req.params.id
    clientService.edit(id, req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const deleteClient = (req, res, next) => {
    const id = req.params.id
    clientService.deleteOne(id)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const findClient = (req, res, next) => {
    clientService.findByAny(req.body)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    createClient,
    clients,
    client,
    editClient,
    deleteClient,
    findClient
}