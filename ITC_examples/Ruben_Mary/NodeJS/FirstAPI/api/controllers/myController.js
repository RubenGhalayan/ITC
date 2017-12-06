var model = require('../models/myModel');

module.exports.addUser = function(req, res) {
    var userDetails = req.body;
    model.users.push(userDetails);
    res.send('{"status":"created"}');
}

module.exports.getUsers = function(req, res) {
    res.send(JSON.stringify(model.users));
}

module.exports.deleteUser = function(req, res) {
    var index, username = req.params.username;
    for (index in model.users) {
        console.log(index);
        console.log(model.users[index]);
        if (model.users[index]['name'] === username) {
            model.users.splice(index, 1);
            break;
        }
    }

    res.send('{"status":"deleted"}');
}

module.exports.deleteAllUsers = function(req, res) {
    model.users = [];
    res.send('{"status":"all_deleted"}');
}
