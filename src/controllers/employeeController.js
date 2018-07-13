const modelFactory = require('../utils/modelFactory')
const resposneHelper = require('../utils/responseHelper')
const authService = require('../services/authService')

const register = (req, res, next) => {
    if (!req.body.username)
        return resposneHelper.malformedRequest('username', req, res, next)
    if(!req.body.password)
        return resposneHelper.malformedRequest('password', req, res, next)
    const employee = modelFactory.createRawEmployee({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    authService.createEmployee(employee)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const employess = (req, res, next) => {
    authService.getAll()
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

const login = (req, res, next) => {
    if(!req.body.email)
        return resposneHelper.malformedRequest('email', req, res, next)
    if(!req.body.password)
        return resposneHelper.malformedRequest('password', req, res, next)
    
    authService.authenticateEmployee(req.body.email, req.body.password)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    register,
    login,
    employess
}