var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var websiteSchema = new Schema({
  protocol : String,
  slashes    : String,
  auth     : String,
  host      : String,
  port      : Date,
  hostname : String,
  hash : String,
  search : String,
  query : String,
  pathname : String,
  path : String,
  href : String
});

var Website = mongoose.model('Website', websiteSchema);

module.exports = Website
