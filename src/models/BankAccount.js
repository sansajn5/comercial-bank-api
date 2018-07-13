const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const Bank = require('../models/Bank')
const ClientModel = require('../models/Client')

const BankAccountSchema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    valid: {
        type: Boolean,
        default: true
    },
    Bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'Currency'
    },
    mailReporting: {
        type: Boolean,
        default: false
    }
})

BankAccountSchema.post('remove',  account => {
    Bank.findOne( {'accounts': account._id}, (err, bank) => {
        bank.accounts.pull(account._id)
        bank.save()
    })
    ClientModel.findOne( {'accounts': account._id}, (err, client) => {
        client.accounts.pull(account._id)
        client.save()
    })
})

BankAccountSchema.plugin(uniqueValidator)

module.exports = mongoose.model('BankAccount', BankAccountSchema)