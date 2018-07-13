const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const CitySchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: false,
      default: ''
    },
    postalCode: {
      type: String,
      unique: true,
      required: false,
      default: ''
    }
  })
  
  CitySchema.plugin(uniqueValidator);
  
  module.exports = mongoose.model('City', CitySchema)