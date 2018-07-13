const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const Currency = require('../models/Currency')

const BankShema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    code: {
        type: String,
        require: true,
        uppercase: true,
        maxlength: 3
    },
    pib: {
        type: String,
        require: true,
        maxlength: 10
    },
    email: {
        type: String,
        require: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    fax: {
        type: String,
        require: true
    },
    currencys: [{
        type: Schema.Types.ObjectId,
        ref: 'Curency'
    }],
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'BankAccount'
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
})

BankShema.post('remove', bank => {
    bank.currencys.forEach( currency => {
        Currency.find({'_id': currency._id}, (err, element) => {
            element.remove()
        })
    })
})

BankShema.plugin(uniqueValidator)

module.exports = mongoose.model('Bank', BankShema)