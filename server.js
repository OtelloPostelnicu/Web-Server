var express = require('express');
var app = express();
var port = 3000;

app.listen(port, function () {
    console.log('Express server started on port '+port+'!');
});

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log('Private route hit!');
        next();
    },
    logger: function(req, res, next) {
        console.log('Request: ' + req.method + ' ' + req.originalUrl + ' ' + new Date().toString());
        next();
    }
};

app.use(middleware.logger);
//app.use(middleware.requireAuthentication);

app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('About Us!');
})

app.use(express.static(__dirname + '/public'));
