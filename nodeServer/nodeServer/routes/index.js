var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();
var TwitterPackage = require('twitter');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var today = new Date();
var tweetMessage = 'Mike Fact #';
var fullTweet = '';
var hashTag = ' #realMikeFacts';
var counter = 191;

var LOGIN_STATUS = false;

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

// Users go here temp.  This will migrate to a user database later on.
let users = [
    {
        id: 1,
        username: 'Mike',
        password: 'theogmike'
    },
    {
        id: 2,
        username: 'RJHURLEY',
        password: 'supermike360'
    }, 
    {
        id: 3,
        username: 'Jb',
        password: 'welcome'
    },
    {
        id: 4,
        username: 'Bobby',
        password: 'ilovemike'
    }, 
    {
        id: 5,
        username: 'brit',
        password: 'welcome'
    },
    {
        id: 6,
        username: 'Nick',
        password: 'helloworld'
    }, 
    {
        id: 7, 
        username: 'Julia',
        password: 'facts4julia'
    },
    {
        id: 8,
        username: 'John',
        password: 'facts4weed'
    },
    {
        id: 9, 
        username: 'Woody',
        password: 'howsthehouse'
    }, 
    {
        id: 10, 
        username: 'Steve',
        password: 'dolfans'
    }, 
    {
        id: 11, 
        username: 'Mikesfriendcapt',
        password: '4Lokolemons'
    },
    {
        id: 12, 
        username: 'welcome',
        password: 'welcome'
    }, 
];
// LOGIN ROUTE
router.post('/login', (req, res) => {
    const { username, password } = req.body;
     let token = null;

    for (let user of users) { // bunch of users to check out... 
        if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
            //If creds are dope and correct, do this code. 
            token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
            LOGIN_STATUS = true;
            break;
        }

        else {
            LOGIN_STATUS = false;
        }
    } // end of for loop

    if (LOGIN_STATUS == true){
            console.log('User: ', username, '\nLogged in on: ', today.getMonth(), "/",
                                                        today.getDate(),"at",today.getHours(),":",today.getMinutes() );

            res.json({
                sucess: true,
                err: null,
                token
            });
    }
    else if(LOGIN_STATUS == false){
            res.json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
    }
});

router.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

//Error handling 
router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

// Image replies
router.get('/imgLogo', function(req, res){
    res.sendFile(__dirname + '/img/Real-Mike-Facts-Logo-Text.png');
});

router.get('/imgMike', function(req, res){
    res.sendFile(__dirname + '/img/Real-Mike-Facts-Logo-1.png');
});

router.get('/imgMikeHash', function(req, res){
    res.sendFile(__dirname + '/img/Real-Mike-Facts-Logo-3.png');
});

router.get('/imgBanner', function(req, res){
    res.sendFile(__dirname + '/img/Real-Mike-Facts-Cover.png');
});

module.exports = router;