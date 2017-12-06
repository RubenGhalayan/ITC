var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

process.env.SECRET_KEY = "soYQ8uaQl8BKr31CwWpANJbCDFglNdhq";

var myUri =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/IMForms';
mongoose.Promise = global.Promise;

mongoose.connect(myUri, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useMongoClient: true
}, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + myUri + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + myUri);
    }
});

var users = require('./routes/users');
var forms = require('./routes/forms');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return msg;
    }
}));

app.use('/users', users);
app.use('/forms', forms);


const viewPath = './views';
app.set('views', path.join(__dirname, viewPath));
app.use(express.static(path.join(__dirname, viewPath)));
app.all('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, viewPath + '/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error 500');
});

module.exports = app;
