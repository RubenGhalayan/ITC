var express = require('express');
var router = express.Router();
var myCtrl = require('../api/controllers/myController');
/* GET users listing. */
router.get('/users', myCtrl.getUsers);
router.post('/users', myCtrl.addUser);
router.delete('/user/:username', myCtrl.deleteUser);
router.delete('/user/', myCtrl.deleteAllUsers);

module.exports = router;
