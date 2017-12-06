var express = require('express');
var router = express.Router();
var myController = require('../controllers/myController');

/* GET users listing. */
router.get('/users', myController.getUsers);
router.post('/users', myController.addUser);
router.delete('/user/:username', myController.deleteUser);
router.delete('/user', myController.deleteAllUsers);

module.exports = router;
