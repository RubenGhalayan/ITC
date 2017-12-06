var user; 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/myDB"; // TODO: add database name to url


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.createCollection("Users", function(err, res) {
        if (err) throw err;
        console.log("Table created!");
        db.close();
    });
    db.close();
});


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
  /*  db.collection("Users").insertOne(user, function(err, res) { // TODO: must have collection named "Users"
        if (err) throw err;
        console.log("1 record inserted");
        db.close();
    });*/
});
module.exports.user = user; 

