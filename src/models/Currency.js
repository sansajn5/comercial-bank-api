const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const CurrencySchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    banks: [{
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    }]
})

CurrencySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Currency', CurrencySchema)