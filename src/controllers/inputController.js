const parser = require('../utils/parser')

const readFile = (req, res, next) => {
    const mode = req.params.mode
    const name = req.body.name
    parser.parseFromXML(name)
    .then(data => res.status(200).json({data: data}))
    .catch(err => res.status(500).json({error: err.message}))
}

module.exports = {
    readFile
}