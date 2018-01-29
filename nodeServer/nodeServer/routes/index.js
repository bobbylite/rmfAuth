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
    readDataEngine(req.body.tweet, req.body.Username);
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

function readDataEngine(msg, username){
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
                var tweet = JSON.parse(response.body)
                jsonPatchTweet(username, tweet.id)
            });

            writeDataEngine(++returnParam);
        });
    counter = returnParam;
    //console.log("Return Param: " + returnParam)
}

function jsonPatchTweet(username, tweetId){
  var options = {
  hostname: '127.0.0.1',
  port: 4300,
  path: '/_data/Users/'+ username.toUpperCase(),
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    } //headers
  } //deOptions
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (body) {
        //console.log('Body: ' + body);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  })

  req.write('[{"op":"add", "path":"/Tweets/1", "value":{"TweetId":"'+ tweetId +'"}}]')
  req.end()
}

const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});

function findUser(user, password, passedRes){
  var options = {
  hostname: '127.0.0.1',
  port: 4300,
  path: '/_data/Users/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    } //headers
  } //deOptions

  let body = [];
  let promise = new Promise(
    (resolve, reject) => {
      var deReq = http.request(options, (res) => {
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          console.log('RECEIVING DATA CHUNK')
          body.push(chunk)
        })// end on data received
        res.on('end', () => {
          var newObj = body[0]
          console.log("Array Size: " + body.length)
          for(var i=0; i < body.length-1; i++){
            console.log("Loop: " + i.toString())
            newObj = body[i].concat(body[i+1])
          }
          resolve(newObj)
        })// end on end
        res.on('error', (err) => {
          console.log(err)
        })
      }); // end of deReq

      deReq.end()
    });// end of promise

  promise.then(
    (val) => {
      var x = JSON.parse(val)
      var sentornot = false
      console.log("Username: " + x[0].content['username'])
      console.log("Number of keys: " + x.length)
      for(var i=0; i< x.length-1; i++){
        if(x[i].content['username'].toUpperCase() == user.toUpperCase()){ // Check if the username guessed exists... undefined means NO.
          console.log("Password: "  + x[i].content['password'])
          var comparePromise = compare(password, x[i].content['password'])
          comparePromise.then(
            (successData) => {
              sentornot = true
              logme(successData, passedRes, x[i].content['username'])
            },
            (errorData) => {
              if(i == x.length-1){
                onError(errorData, passedRes)
              }
            })
        }
        else if(x[i].content['username'].toUpperCase() != user.toUpperCase()){ // THIS IS THE PROBLEM RIGHT HERE
          if(i == x.length-2){
            console.log("That username doesn't exist")
            var comparePromise = compare(password, x[i].content['password'])
            comparePromise.then(
              (successData) => {
                sentornot = true
                logme(successData, passedRes, x[i].content['username'])
              },
              (errorData) => {
                if(i == x.length-1){
                  onError(errorData, passedRes)
                }
              })
          }
        }
      }
    }).catch(
      (reason) => {
        console.log(reason)
    })
};// end of findUser()

function compare(object, objHash){
  return bcrypt.compare(object, objHash).then((res) => {
      return res;
  });
}

function onError(data, res){
  console.log("Status: "+data)
  res.json({
      sucess: false,
      token: null,
      err: 'Username or password is incorrect'
  });
}

function logme(data, res, username) {
  console.log("Status: "+data)
  if(data){
    var token = jwt.sign({ id: 0, username: username}, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
    res.json({
        sucess: data,
        err: null,
        token
    });
  } else {
    res.json({
        sucess: false,
        token: null,
        err: 'Username or password is incorrect'
    });
  }
}

// LOGIN ROUTE
router.post('/login', (req, res) => {
    const { username, password } = req.body;
     let token = null;
    findUser(username, password, res)
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
  var exists = false

  var options = {
      hostname: '127.0.0.1',
      port: 4300,
      path: '/_data/Users/' + request.body.Username.toUpperCase(),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
  };
  var checkOptions = {
      hostname: '127.0.0.1',
      port: 4300,
      path: '/_data/Users/' + request.body.Username.toUpperCase(),
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  };

  let promise = new Promise(
    (resolve, reject) => {
      var checkReq = http.request(checkOptions, (res) =>{
        res.setEncoding('utf8');
        res.on('data', (body) => {
          var x = JSON.parse(body)
          if(x.username != undefined){
            exists = true
            resolve(exists)
          }
          else{
            exists = false
            resolve(exists)
          }
        })
        res.on('error', (err) => {
          console.log("EXISTS")
          console.log(err)
        })
      })
      checkReq.end() // move this.
    })

  promise.then(
    (eon) => {
      console.log("DOES EXIST: " + eon)
      if(!eon){
        var req = http.request(options, (res) =>{
            res.setEncoding('utf8');
            res.on('data', function (body) {
                console.log(body);
            })
        })

        req.on('error', (e) => {
          console.log("Erro: " + e.message)
        })

        req.write('{ "id": "0","username": "' + request.body.Username +'", "password": "' + request.body.Password +'", "attempts": 1, "Tweets": [] }')

          // for PATCH only
          //req.write('[{"op":"add", "path":"/'+ request.body.Username +'", "value":"'+ request.body.Password +'"}]')
        req.end();
        response.status(200)
        response.json({
          sucess: true,
          message: ''
        })
      }
      if(eon){
        console.log("Username Exists already.")
        response.status(409)
        response.json({
          sucess: false,
          message: 'Username already taken!'
        })
      }
    })
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
