var model = require('../models/myModel');

module.exports.addUser = function(req, res) {
    var userDetails = req.body;
    model.user = userDetails;
    res.send('{"status":"created"}');
}

module.exports.getUsers = function(req, res) {
    // TODO: get all users from database
    res.send(JSON.stringify(model.users));
}

module.exports.deleteUser = function(req, res) {
    var username = req.params.username;
    // TODO: delete user from database

    res.send('{"status":"deleted"}');
}

module.exports.deleteAllUsers = function(req, res) {
    // TODO: Empty database
    res.send('{"status":"all_deleted"}');
}

