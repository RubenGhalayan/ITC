var MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/Users";

module.exports.MongoClient = MongoClient;
module.exports.url = url; 

