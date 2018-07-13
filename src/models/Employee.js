const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

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
        require: true,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    lastName: {
        type: String,
        require: true,
        default: ''
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