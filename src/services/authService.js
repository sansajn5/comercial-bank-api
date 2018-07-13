const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employee = require('../models/Employee')

const createEmployee = async (employeeRaw) => {
    employeeRaw.password = bcrypt.hashSync(employeeRaw.password, parseInt(process.env.SALT_LENGTH))
    return employeeRaw.save()
}

const authenticateEmployee = (email, password) => {
    return new Promise(async (resolve, reject) => {
        const employee = await Employee.findOne({email : email.toLowerCase()})
        if(!employee) return reject( new Error(`Could not find employee with ${email}`))
        if (!bcrypt.compareSync(password, employee.password))
            return reject(new Error(`Password is not valid`))
        
        delete employee.password
        const token = jwt.sign({employee}, process.env.JWT_SECRET, {expiresIn: parseInt(process.env.JWT_EXPIRE)})
        resolve({
            employee: {
            _id: employee._id,
            email: employee.email,
            username: employee.username,
            firstName: employee.firstName,
            lastName: employee.lastName,
            bank: employee.bank,
            createdDate: employee.createdDate
            },
            token
        })
    })
}

const getAll = async () => {
    try {
        const employees = await Employee.find()
        return Promise.resolve(employees)
    } catch (err) {
        Promise.reject(err)
    }
}

module.exports = {
    createEmployee,
    authenticateEmployee,
    getAll
}