var model = require('../models/myModel'),
    MongoClient = model.MongoClient,
    url = model.url;

module.exports.addUser = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('users');
        collection.insert(req.body); 
        db.close();
        res.send({"Status": "Created"});
    });
}

module.exports.getUsers = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('users');
        collection.find().toArray(function(err, users) {
        if (err) throw err;
        res.send(JSON.stringify(users));
        db.close();
        });
    }); 
}

module.exports.deleteUser = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('users');
        collection.remove({"name": req.params.username});
        res.send({"Status": "Deleted"});
    });
}

module.exports.deleteAllUsers = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('users');
        collection.remove();
        res.send({"Status": "all deleted"});
    });
}

