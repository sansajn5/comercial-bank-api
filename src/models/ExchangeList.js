const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const ExchangeSchema = new Schema({
    list: [{
        type: Schema.Types.ObjectId,
        ref: 'ExchangeRate'
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    }
})

ExchangeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Exchange', ExchangeSchema)