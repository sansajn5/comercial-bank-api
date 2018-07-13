const Client = require('../models/Client')
const Currency = require('../models/Currency')
const Bank = require('../models/Bank')
const BankAccount = require('../models/BankAccount')

const save = async (rawBankAccount, ownerId, currencyId, bankId) => {
    try {
        let client = await Client.findById(ownerId).exec()
        let bank = await Bank.findById(bankId)
        let currency = await Currency.findById(currencyId)
        rawBankAccount.Bank = bank
        rawBankAccount.currency = currency
        rawBankAccount.owner = client
        client.accounts.push(rawBankAccount)
        client.save()
        bank.accounts.push(rawBankAccount)
        bank.save()
        return Promise.resolve(rawBankAccount.save())
    } catch(err) {
        Promise.reject(err)
    }
}

const findAllFor = async(criteria) => {
    return BankAccount.find(criteria).populate('owner').populate('currency').exec()
}

const findOne = async(id) => {
    return BankAccount.findById(id).populate('owner').populate('currency').exec()
}

const deleteOne = async(id) => {
    let account = await BankAccount.findById(id)
    return account.remove()
}

const edit = async(rawBankAccount, id) => {
    try {
        rawBankAccount.owner = rawBankAccount.ownerId;
        rawBankAccount.currency = rawBankAccount.currencyId;
        let bankAccount = await BankAccount.findOneAndUpdate({'_id': id}, rawBankAccount).exec()
        if(!bankAccount) {
            return Promise.reject(
                new Error('Currency with that properties does not exist')
            );
        }
        return BankAccount.findOne({'_id': bankAccount._id}).exec()
    } catch (err) {
        Promise.reject(err)
    }
}

module.exports = {
    save,
    findAllFor,
    findOne,
    deleteOne,
    edit
}