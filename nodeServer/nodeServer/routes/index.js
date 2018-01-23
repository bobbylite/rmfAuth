var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var bcrypt = require('bcrypt');
var router = express.Router();
var TwitterPackage = require('twitter');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const DataEngine = require('node-dataengine-client').DataEngine;
var today = new Date();
var tweetMessage = 'Mike Fact #';
var fullTweet = '';
var hashTag = ' #realMikeFacts';
const fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

var LOGIN_STATUS = false;

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});


var deOptions = {
    host: '127.0.0.1',
    port: 4300,
    bucket: 'myBucket',
};
const de = new DataEngine(deOptions);
var counter = 0;

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
    readDataEngine(req.body.tweet);
    console.log(req.body); // RECEIVING JSON PACKAGE NOT URL POST incase Mike doesn't like URL params
    console.log(req.params.React_Message); // RECEIVING JSON USING URL PARAMS.

    res.send(req.params);
});

de.connection.addListener('myBucket', 'factCount', true, (event) => {
    // Use onConnet here to send Commands
    counter = event.value;
    console.log('fact count: ', counter.factCount);
});

function writeDataEngine(data){
    de.write('factCount', { factCount: data })
        .then(() => console.log('Written!'));
}

function readDataEngine(msg){
    var returnParam;
    de.read('factCount')
        .then(function(value){ // DATAENGINE MUST BE RUNNING TO POST. SINGLE POINT OF FAILURE.
            returnParam = value.factCount;
            console.log("Read: " + returnParam);
            fullTweet = tweetMessage + returnParam + ': ' + msg + hashTag;
            console.log("Tweet!!! : " + fullTweet);
            Twitter.post('statuses/update', { status: fullTweet }, function(error, tweet, response) {
                if (error) {
                    console.log(error);
                }
                //console.log(tweet); // Tweet body.
                console.log(response.body); // Raw response object.
            });

            writeDataEngine(++returnParam);
        });
    counter = returnParam;
    //console.log("Return Param: " + returnParam)
}

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
    {
        id: 13,
        username: 'Jujujus2',
        password: 'facts4justin'
    },
    {
        id: 14,
        username: 'JorgyPorgy',
        password: 'welovefacts'
    },
    {
        id: 15,
        username: 'Jess',
        password: 'bobbyiscool'
    },
    {
        id: 16,
        username: 'Lauren',
        password: 'wontonrules'
    },
    {
      id: 17,
      username: 'Felicia',
      password: 'iluvpiano'
    },
    {
      id: 18,
      username: 'Vic',
      password: 'mskhascancer'
    },
    {
      id: 19,
      username: 'lol',
      password: 'thisisatest'
    }

];

function findUser(guessUser, guessPass, res){

  var options = {
      hostname: '127.0.0.1',
      port: 4300,
      path: '/_data/Users',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  };
  var request = http.request(options, (response) =>{
      response.setEncoding('utf8');
      response.on('data', function (body) {
        var dataEngineObj = JSON.parse(body)
        for(var i=0; i < Object.keys(dataEngineObj).length; i++){
          console.log(dataEngineObj[i].content.username); /// WOOO!
          if(dataEngineObj[i].content.username == guessUser){
            if(bcrypt.compareSync(guessPass, dataEngineObj[i].content.password)){
              console.log("Correct guess")
              token = jwt.sign({ id: 0, username: dataEngineObj[i].content.username}, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
              LOGIN_STATUS = true;
            }
            else {
              LOGIN_STATUS = false;
            }
            if (LOGIN_STATUS == true){
                    console.log('User: ', guessUser, '\nLogged in on: ', today.getMonth(), "/",
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
          }
        }
      })

  })


  request.on('error', (e) => {
    console.log(e.message)
  })

  request.end();
};
// LOGIN ROUTE
router.post('/login', (req, res) => {
    const { username, password } = req.body;
     let token = null;
    findUser(username, password, res)
    /*
    for (let user of users) { // bunch of users to check out...

        if (username.toUpperCase() == user.username.toUpperCase() && password == user.password ) {// Use your password hash checking logic here
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
    */
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

// recieves the request for creating a new user.
router.post('/CreateUser', function(request, response) {
  console.log(request.body.Username)
  console.log(request.body.Password)

  var options = {
      hostname: '127.0.0.1',
      port: 4300,
      path: '/_data/Users/' + request.body.Username,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
  };
  var req = http.request(options, (res) =>{
      res.setEncoding('utf8');
      res.on('data', function (body) {
          console.log(body);
      })
  })

  req.on('error', (e) => {
    console.log("Erro: " + e.message)
  })

  req.write('{ "id": "0","username": "' + request.body.Username +'", "password": "' + request.body.Password +'", "attempts": 1, "Tweets": { } }')

  // for PATCH only
  //req.write('[{"op":"add", "path":"/'+ request.body.Username +'", "value":"'+ request.body.Password +'"}]')
  req.end();
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

router.get('/imgHashMike', function(req, res){
    res.sendFile(__dirname + '/img/Real-Mike-Facts-Logo-2.png')
});



module.exports = router;
