var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('./services/jwt.js');


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

/**-------------------
 * user register route
 -------------------*/
app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User({
        email : user.email,
        password : user.password
    });
    newUser.save(function (err) {
        if (err) return res.status(500, {message : 'coudn\'t save user'});
        createSendToken(newUser, res);
    });
});

/**
 * user login route
 */
app.post('/login', function (req, res) {

    req.user = req.body;
    var searchUser = {
        email:req.user.email
    };
    User.findOne(searchUser, function (err, foundUser) {
        if(err) throw err;
        if (!foundUser)  return res.status(401).send({message : 'wrong email/password..'});
        foundUser.comparePasswords(req.user.password, function (err, isMatch) {
            if (!isMatch)
                return res.status(401).send({message : 'wrong email/password....'});
            createSendToken(foundUser, res);
        });
    });
});

/**--------------------------------
 * jobs route to get a list of jobs (authenticated)
 --------------------------------*/
app.get('/jobs', function (req, res) {

    var jobs = [
        'super Hero',
        'Programmer',
        'train Driver'
    ];

    /**-------------------------------------------------------
     * check for authorization in the request headers
     * ( will be valid only if we have an authorization token )
     * if Not exists response with 401 not authorized else return jobs
     * and if authorization exists get the token from the authorization
     * header it's form is['Bearer ' + token] .
     --------------------------------------------------------*/
    if(!req.headers.authorization){
        return res.status(401).send({
            message: 'you are not authorized!'
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'shhhh..');
    if(!payload.sub)
        res.status(401).send({
            message : 'Authorization failed'
        });
    res.json(jobs);

});
mongoose.connect('mongodb://localhost/psjwt')
var server = app.listen(3000, function () {
    console.log('server is running on port ' + server.address().port);
});

/**
 * custom functions
 */
/**
 * responsible for creating and sending the jwt in
 * both Login and register.
 * @param user
 * @param res
 */
function createSendToken (user, res) {
    var payload = {
        sub : user.id,
    }
    var token = jwt.encode(payload, 'shhhh..');
    res.status(200).send({
        user : user.toJSON(),
        token : token
    });
};