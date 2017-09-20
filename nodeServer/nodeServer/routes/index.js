var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();
var TwitterPackage = require('twitter');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var tweetMessage = 'Mike Fact #';
var fullTweet = '';
var hashTag = ' #realMikeFacts';
var counter = 182;

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});


router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

// Twitter API setup
var secret = {
    consumer_key: 'hYTWcNYoR2PW9LZszZ4SMRg61',
    consumer_secret: 'WMAEXgLRC88wY6vMqReGuQT3lu1a0MfdTNxvWEZYFL0XeUgDpL',
    access_token_key: '872881955427299328-xuLWgWH9KAgdGtSOkKi9CRXdUAYr1sl',
    access_token_secret: '1DvNHUOXtM5MkAYBeiQ3c2FNN4KYrUaffVVdfsgOK0Spy'
}
var Twitter = new TwitterPackage(secret);

/* GET home page. */

router.post('/Message/:React_Message', function(req, res, next) {
    console.log(req.body);
    // Build the full tweet from REST API 
    fullTweet = tweetMessage + counter.toString() + ': ' + req.params.React_Message + hashTag;
    console.log('got it! ');
    // Actually POST to twitter REST web API
    Twitter.post('statuses/update', { status: fullTweet }, function(error, tweet, response) {
        if (error) {
            console.log(error);
        }
        //console.log(tweet); // Tweet body.
        //console.log(response); // Raw response object.
    });

    //Return something scuessfully
    res.send(req.params);

    //Tweet counter
    counter++;
});
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'mike',
        password: 'robiscool'
    },
    {
        id: 2,
        username: 'test',
        password: 'asdf123'
    }
];
// LOGIN ROUTE
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Username: ', username);
    console.log('Password: ', password);
    // Use your DB ORM logic here to find user and compare password
    for (let user of users) { // I am using a simple array users which i made above
        console.log('testing some stuff', user.username, user.password);
        if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
            //If all credentials are correct do this
            let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
            res.json({
                sucess: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
});

router.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling 
//router.use(function (err, req, res, next) {
    //if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        //res.status(401).send(err);
    //}
    //else {
        //next(err);
    //}
//});

module.exports = router;