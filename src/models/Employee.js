const mongoose = require('mongoose')
const uniqueValidator = require('monoose-unique-validator')
const schema = mongoose.Schema

const EmployeeSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }    
})

EmployeeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Employee', EmployeeSchema)