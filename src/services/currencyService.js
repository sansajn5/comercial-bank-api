const Currency = require('../models/Currency')
const Bank = require('../models/Bank')

const findAll = async() => {
    return await Currency.find();
}

const findOneById = async(id) => {
    return await Currency.findById(id)
}

const findByAny = async(criteria) => {
    return await Currency.find(criteria)
}

const save = async(bankId, rawCurrency) => {
    const currency = await Currency.findOne({'code': rawCurrency.code.toUpperCase()})
    let bank = await Bank.findById(bankId)
    if(!currency) {
        bank.currencys.push(rawCurrency)
        bank.save()
        rawCurrency.banks.push(bank)
        return rawCurrency.save()
    } else {
        bank.currencys.push(currency)
        bank.save()
        currency.banks.push(bank)
        return currency.save()
    }
}

const edit = async(id, rawCurrency) => {
    try {
        const currency = await Currency.findOneAndUpdate({'_id': id}, rawCurrency).exec()
        if(!currency) {
            return Promise.reject(
                new Error('Currency with that properties does not exist')
            );
        }
        return Currency.findOne({'_id': currency._id}).exec()
    } catch (err) {
        Promise.reject(err)
    }
}

const deleteOne = async(bankId, id) => {
    let bank = await Bank.findById(bankId)
    let currency = await Currency.findById(id);
    currency.banks.pull(bankId)
    currency.save()
    bank.currencys.pull(id)
    return bank.save()
}

module.exports = {
    findAll,
    findOneById,
    findByAny,
    save,
    edit,
    deleteOne
}