const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const ClearingListSchema = new Schema({
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    },
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

ClearingListSchema.plugin(uniqueValidator)

module.exports = mongoose.model('ClearingList', ClearingListSchema)