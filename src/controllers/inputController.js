const parser = require('../utils/parser')
const responseHelper = require('../utils/responseHelper')
const bankService = require('../services/bankService')
const modelFactory = require('../utils/modelFactory')
const fs = require('fs')

const readFile = (req, res, next) => {
    const name = req.body.name
    parser.parseFromXML(name)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const createTransaction = (req, res, next) => {
    const currentBankId = req.params.id
    const rawTransaction = modelFactory.createRawTransaction(req.body)
    
    if(req.body.type == 'Nalog za isplatu') {
        bankService.nalogIsplata(currentBankId, rawTransaction)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({error: err.message}))
    } else if(req.body.type == 'Nalog za uplatu') {
        bankService.nalogUplata(currentBankId, rawTransaction)
        .then(data => res.status(200).json({data: data}))
        .catch(err => res.status(500).json({error: err.message}))
    } else if(req.body.type == 'Nalog za naplatu') {

    } else if(req.body.type == 'Nalog za prenos') {

    } else {
        responseHelper.malformedRequest('type',req, res, next)
    }
}

const findBetween = (req, res, next) => {
    const from = req.body.from
    const to = req.body.to
    const accountId = req.params.id
    bankService.stateForInterval(accountId, from, to)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const findAll = (req, res, next) => {
    const bankId = req.params.id
    bankService.nalozi(bankId)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const xml = (req, res, next) => {
    const from = req.body.from
    const to = req.body.to
    const accountId = req.params.id
    bankService.makeXML(accountId, from, to)
    .then(data => {
        const filepath =`./db/output/listing${from}-${to}-${accountId}.xml`
        fs.writeFile(filepath, data, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
        }); 
        res.status(200).json({data: 'ok'})
    })
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    readFile,
    createTransaction,
    findBetween,
    findAll,
    xml
}