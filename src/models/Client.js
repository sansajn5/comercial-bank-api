const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const Bank = require('../models/Bank')
const BankAccount = require('../models/BankAccount')

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    jmbg: {
        type: String,
        maxlength: 13,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    legal: {
        type: Boolean,
        required: true,
        default: false
    },
    pib: {
        type: String,
        maxlength: 10
    },
    taxAuthority: {
        type: String
    },
    deliveryAddress: {
        type: String
    },
    responsiblePerson: {
        type: String
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'BankAccount'
    }],
})

ClientSchema.post('remove', client => {
    Bank.find( {'clients': client._id}, (err, banks) => { 
        banks.forEach(bank => {
            bank.clients.pull(client._id)
            bank.save()
        })
    })
    client.accounts.forEach(account => {
        BankAccount.find( {'_id': account._id } (err, bankAccount => {
            bankAccount.remove()
        }))
    })
})

ClientSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Client', ClientSchema)