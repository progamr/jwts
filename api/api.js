var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app  = express();
app.use(bodyParser.json());

/**-------------------------------------------------
 * setup our cross origin resource sharing inside our
 * app using this custom middleware.
 --------------------------------------------------*/

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User({
        email : user.email,
        password : user.password
    });
    newUser.save(function (err) {
        res.status(200).json(newUser);
        console.log(newUser);
    });
});

mongoose.connect('mongodb://localhost/psjwt')
var server = app.listen(3000, function () {
    console.log('server is running on port ' + server.address().port);
});