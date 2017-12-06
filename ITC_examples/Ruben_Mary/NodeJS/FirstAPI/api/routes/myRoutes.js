
module.exports = function(app) {
    var myController = require('../controllers/myController');
    app.get('/users', myController.getUsers);
    app.post('/users', myController.addUser);
    app.delete('/user/:username', myController.deleteUser);
    app.delete('/user', myController.deleteAllUsers);
}
