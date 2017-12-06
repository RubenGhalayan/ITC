var express = require('express');
var router = express.Router();
var userCtrl = require('../users/controller');

router.use(function (req, res, next) {
    next();
});

router.get('/validToken', userCtrl.isValidToken); //Token validation
router.get('/getAllUsers/:formID', userCtrl.getAllUsers); // Get all users
router.get('/:email', userCtrl.forgotPassword); //Forgot password
router.post('/addUser', userCtrl.addUser); //Register
router.post('/verifyUser', userCtrl.verifyUser); //Verify user
router.delete('/:id', userCtrl.deleteUser); // delete user by user ID
router.put('/:token', userCtrl.updatePassword); // Update password by user ID
router.get('/resetPassword/:token', userCtrl.resetPassword); // Reset password
router.post('/shared/:formID', userCtrl.shared); //Shared
router.post('/sendMessage', userCtrl.sendMessage); //Send message 

module.exports = router;
