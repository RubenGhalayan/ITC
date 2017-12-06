var express = require('express'),
    routes = require('./api/routes/myRoutes'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));

routes(app);

app.listen(3000);

