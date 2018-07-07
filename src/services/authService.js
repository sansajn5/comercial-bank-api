const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employee = require('../models/Employee')

const createEmployee = (employeeRaw) => {
    employeeRaw.password = bcrypt.hashSync(employeeRaw.password, parseInt(process.env.SALT_LENGTH))
    return employeeRaw.save()
}

module.exports = {
    createEmployee,
}