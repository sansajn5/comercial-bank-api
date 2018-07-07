const mongoose = require('mongoose')
const uniqueValidator = require('monoose-unique-validator')
const schema = mongoose.Schema

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
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
})

BankShema.plugin(uniqueValidator)

module.exports = mongoose.model('Bank', BankShema)