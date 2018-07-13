const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    type: { 
        type: String,
        required: true
    },
    debtor: {
        type: String,
        required: true
    },
    creditor: {
        type: String,
        required: true
    },
    currencyDate: {
        type: Date,
        default: Date.now()
    },
    sum: {
        type: Number
    },
    debtorAccountXML: {
        type: String
    },
    modelAssigments: {
        type: String
    },
    referenceNumberAssigments: {
        type: String
    },
    emergency: {
        type: Boolean
    },
    typeOfMistake: {
        type: String,
        default: '1'
    },
    status: {
        type: String,
        default: 'Active'
    },
    paymentTypeXML: {
        type: String
    },
    paymentCurrencyXML: {
        type: String
    },
    cityXML: {
        type: String
    },
    code: {
        type: String
    },
    purposeOfPayment: {
        type: String
    },
    accountCreditorXML: {
        type: String
    }
})

TransactionSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Transaction', TransactionSchema)