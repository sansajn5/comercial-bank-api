const Employee = require('../models/Employee')

const createRawEmployee = (rawEmployee) => {
    return employee = new Employee({
        username: rawEmployee.username,
        password: rawEmployee.password,
        firstName: rawEmployee.firstName,
        lastName: rawEmployee.lastName
    })
}

module.exports = {
    createRawEmployee,
}

