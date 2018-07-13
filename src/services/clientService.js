const Client = require('../models/Client')

const findAll = async() => {
    try {
        const clients = await Client.find()
        return Promise.resolve(clients)
    } catch (err) {
        Promise.reject(err)
    }
}

const findOneById = async(id) => {
    try {
        const client = await Client.findById(id)
        return Promise.resolve(client)
    } catch (err) {
        Promise.reject(err)
    }
}

const findByAny = async(criteria) => {
    try {
        const clients = await Client.find(criteria)
        return Promise.resolve(clients)
    } catch (err) {
        Promise.reject(err)
    }
}

const save = async(rawClient) => {
    return rawClient.save()
}

const edit = async(id, rawClient) => {
    try {
        delete rawClient.jmbg
        delete rawClient.email
        const client = await Client.findOneAndUpdate({'_id': id}, rawClient).exec()
        if(!client) {
            return Promise.reject(
                new Error('Client with that properties does not exist')
            );    
        }
        return Client.findOne({'_id': client._id}).exec()
    } catch (err) {
        Promise.reject(err)
    }
}

const deleteOne = async(id) => {
    try {
        let client = Client.findById(id)
        client.remove()
        Promise.resolve(client)
    } catch (err) {
        Promise.reject(err)
    }
}

module.exports = {
    findAll,
    findOneById,
    findByAny,
    save,
    edit,
    deleteOne
}