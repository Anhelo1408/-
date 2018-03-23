var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/anheloCV');

var app = express();
//var routes = require('./routes/login.js');
var router = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.get('/CV', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/AnheloCV.html'));
});
app.use(express.static(__dirname + '/public'))

app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/loginpage.html'));
});

app.post('/contact', function(req, res) //отсылает письмо и записывает по этому адресу
  {
    var email = req.body.email;
    var message = req.body.message;

    var db = req.db;
    var collection = db.get('messages');
    collection.insert(req.body, function(err, result) {
      res.send(
        (err === null) ? {
          msg: ''
        } : {
          msg: err
        }
      );
    });
  });

app.post('/pasword', function(req, res) {
  var login = req.body.login;
  var pass = req.body.pass;

  var db = req.db;

  db.collection("login").find({}, {
    _id: 0,
    login: 1,
    pass: 1
  }, function(err, result) {
    if (err) throw err;

    if (login == result[0].login && pass == result[0].pass) {
      db.collection("messages").find({}, {
        _id: 0,
        email: 1,
        message: 1
      }, function(err_messages, result_messages) {
        if (err_messages) throw err_messages;

        res.send(result_messages);
      });
    } else {
      res.send("lashara")
    }
  });
});


app.listen(3000, function() {
  console.log('Api app started');
})
