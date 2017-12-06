var myArgs = process.argv.slice(2);
var fs = require('fs');
var data = fs.readFileSync('users.txt', 'utf8').split('\n');

switch (myArgs[0]) {
    case "register":
	if (myArgs.length != 5 ) {
	    console.log("More arguments");
	} else {
	    myArgs = myArgs.slice(1);
	    register(myArgs);
	}
	break;
    case "login":
	if (myArgs.length != 3 ) {
	    console.log("More arguments");
	} else {
	    myArgs = myArgs.slice(1);
	    login(myArgs);
	}
	break;
    case "resetPassword":
	if (myArgs.length != 5 ) {
	    console.log("More arguments");
	} else {
	    myArgs = myArgs.slice(1);
	    resetPassword(myArgs);
	}
	break;
    case "getUserInfo":
	if (myArgs.length != 2 ) {
	    console.log("More arguments");
	} else {
	    myArgs = myArgs.slice(1);
	    getUserInfo(myArgs);
	}
	break;
    case "getUsers":
	if (myArgs.length != 1 ) {
	    console.log("More arguments");
	} else {
	    myArgs = myArgs.slice(1);
	    getUsers();
	}
	break;
    default:
	console.log("Unknown command")
}

function register () {
    fs.appendFile("users.txt", myArgs, function (err){
	if(err) {
	    return console.log(err);
	}
	console.log("This file was saved!");
    });
}

function login () {
    var isLogin = false;
    for (var i = 0; i < data.length; ++i) {
	var user = data[i].split(',');
	if (myArgs[0] = user[0] && myArgs[1] == user[1]) {
	    isLogin = true;
	}
    }
    if (isLogin == true) {
	console.log("OK!");
    } else {
	console.log("Authentication failed!");
    }
}

function resetPassword () {
    var isReset = false;
    for (var i = 0; i < data.length; ++i) {
	var user = data[i].split(',');
	if (myArgs[0] = user[0] && myArgs[1] == user[2] && myArgs[2] == user[3]) {
	    data[i] = user[0] + ',' + myArgs[3] + ',' + user[2] + ',' + user[3];
	    
	}
    }
    fs.unlinkSync('users.txt');
    for (var i = 0; i < data.length; ++i) {
        fs.appendFile("users.txt", data[i]+'\n', function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }
}

function getUserInfo () {
    for (var i = 0; i < data.length; ++i) {
        var user = data[i].split(',');
        if (myArgs[0] == user[0]) {
	    console.log(data[i]);
        }
    }
}

function getUsers () {
    for (var i = 0; i < data.length; ++i){
	console.log(data[i]);
    }
}
