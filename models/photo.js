const mongoose = require("mongoose");
const Schema = mongoose.Schema

const photoSchema = new Schema({
  urlTo: String,
  date: Date,
  location: String,
  // gId: String,
  // filename: String,
  // baseUrl: String,
  // mediaMetadata: Object,
}, {timestamps: true})

 module.exports = mongoose.model('Photo', photoSchema)