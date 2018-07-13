const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const AccountStateSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

AccountStateSchema.plugin(uniqueValidator)

module.exports = mongoose.model('AccountState', AccountStateSchema)