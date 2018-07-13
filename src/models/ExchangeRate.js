const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const ExchangeList = require('../models/ExchangeList')

const ExchangeRateSchema = new Schema({
    fromCurrency: {
        type: Schema.Types.ObjectId,
        ref: 'Currency'
    },
    toCurrency: {
        type: Schema.Types.ObjectId,
        ref: 'Currency'
    },
    value: {
        type: String,
        default: '0',
        required: true
    }
})

ExchangeRateSchema.post('remove', rate => {
    ExchangeList.find({}, exchangeList => {
        exchangeList.list.pull(rate._id)
        exchangeList.save()
    })
})

ExchangeRateSchema.plugin(uniqueValidator)

module.exports = mongoose.model('ExchangeRate', ExchangeRateSchema)