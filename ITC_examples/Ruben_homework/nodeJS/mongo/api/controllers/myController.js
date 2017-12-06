var model = require('../models/myModel'),
    user = model.User;

module.exports.getUsers = function(req, res) {
    user.find({}, function(err,docs) {
	if(err) {
	    res.status(400).send("error in find");
	}
	res.send(docs);
    });  
}

module.exports.addUser = function(req, res) {
    var newuser = new user (req.body);
    newuser.save(function (err) {
	if (err){
	    if (err.errors.name) {
                return res.status(400).send(err.errors.name.message );
           } 
           if (err.errors.password) {
                return res.status(400).send(err.errors.password.message );
           } 
           if (err.errors.email) {
                return res.status(400).send(err.errors.email.message );
           } else {
               return next(err);
           }  
	}	
	res.status(200).send({'register':'true'});
    });
}

module.exports.deleteUser = function(req, res) {
    var name = req.params.username;
    user.remove({"name": name}, function(err){
	    if(err) {
		res.status(400).send(err);
	    }	
    });
    res.status(200).send({"delete":true});
}

module.exports.deleteAllUsers = function(req, res) {
    user.remove({}, function(err){
	    if(err) {
		res.status(400).send(err);
	    }
    });
    res.status(200).send({"deleteAll":true});
}
