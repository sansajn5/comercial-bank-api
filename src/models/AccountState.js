const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const AccountStateSchema = new Schema({
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    value: {
        type: Number
    },
    bankAccount: {
        type: Schema.Types.ObjectId,
        ref: 'BankAccount'
    }
})

AccountStateSchema.plugin(uniqueValidator)

module.exports = mongoose.model('AccountState', AccountStateSchema)